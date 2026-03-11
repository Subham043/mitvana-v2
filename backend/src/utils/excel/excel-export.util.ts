import * as ExcelJS from 'exceljs'
import { PassThrough } from 'stream'

type Column = {
    header: string
    key: string
    width?: number
}

type ExportOptions<T> = {
    sheetName: string
    columns: Column[]
    fetchBatch: (offset: number, limit: number) => Promise<T[]>
    mapRow: (row: T) => Record<string, any>
    batchSize?: number
}

export async function exportExcelStream<T>({
    sheetName,
    columns,
    fetchBatch,
    mapRow,
    batchSize = 1000,
}: ExportOptions<T>) {
    const stream = new PassThrough()

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
        stream,
        useStyles: false,
        useSharedStrings: false,
    })

    const worksheet = workbook.addWorksheet(sheetName)

    worksheet.columns = columns

    let offset = 0

    while (true) {
        const rows = await fetchBatch(offset, batchSize)

        if (!rows.length) break

        for (const row of rows) {
            worksheet.addRow(mapRow(row)).commit()
        }

        offset += batchSize
    }

    worksheet.commit()

    await workbook.commit()

    stream.end()

    return stream
}