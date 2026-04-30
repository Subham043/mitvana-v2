import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  containBtn?: boolean;
  onClick?: () => void;
  btnText?: string;
};

function EmptySection({
  title,
  description,
  Icon,
  containBtn,
  onClick,
  btnText,
}: Props) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {containBtn && onClick && btnText && (
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="cursor-pointer" type="button" onClick={onClick}>
            {btnText}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

export default EmptySection;
