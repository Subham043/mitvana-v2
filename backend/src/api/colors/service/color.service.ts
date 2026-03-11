import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ColorServiceInterface } from '../interface/color.service.interface';
import { ColorRepositoryInterface } from '../interface/color.repository.interface';
import { COLOR_REPOSITORY } from '../color.constants';
import { ColorEntity } from '../entity/color.entity';
import { ColorDto } from '../schema/color.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { PassThrough } from 'stream';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';

@Injectable()
export class IColorService implements ColorServiceInterface {

  constructor(
    @Inject(COLOR_REPOSITORY) private readonly colorRepository: ColorRepositoryInterface,
  ) { }

  async getById(id: string): Promise<ColorEntity> {
    const color = await this.colorRepository.getById(id, { autoInvalidate: true });

    if (!color) throw new NotFoundException("Color not found");

    return color;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<ColorEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const colors = await this.colorRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.colorRepository.count(search, { autoInvalidate: true });
    return { data: colors, meta: { page, limit, total: count, search } };
  }

  async createColor(color: ColorDto): Promise<ColorEntity> {
    const newColor = await this.colorRepository.createColor(color);

    if (!newColor) throw new InternalServerErrorException('Failed to create color');

    return newColor;
  }

  async updateColor(id: string, color: ColorDto): Promise<ColorEntity> {
    const colorById = await this.colorRepository.getById(id);

    if (!colorById) throw new NotFoundException("Color not found");

    const updatedColor = await this.colorRepository.updateColor(id, color);

    if (!updatedColor) throw new InternalServerErrorException('Failed to update color');

    return updatedColor;
  }

  async deleteColor(id: string): Promise<void> {
    const colorById = await this.colorRepository.getById(id);

    if (!colorById) throw new NotFoundException("Color not found");

    await this.colorRepository.deleteColor(id);
  }

  async exportColors(search?: string): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Colors',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Code', key: 'code', width: 30 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search,
        })

        return this.colorRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
        })
      },

      mapRow: (color) => ({
        id: color.id,
        name: color.name,
        code: color.code,
        createdAt: color.createdAt?.toISOString(),
        updatedAt: color.updatedAt?.toISOString(),
      }),
    })
  }
}
