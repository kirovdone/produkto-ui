import {
  TextAlignCenterIcon,
  TextAlignJustifyLeftIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "../components/Icon";

export interface AlignmentChoice<T extends string = string> {
  label: string;
  value: T;
  icon: IconSvgElement;
}

export const TEXT_ALIGNMENTS: readonly AlignmentChoice[] = [
  { label: "Left", value: "left", icon: TextAlignLeftIcon },
  { label: "Center", value: "center", icon: TextAlignCenterIcon },
  { label: "Right", value: "right", icon: TextAlignRightIcon },
  { label: "Justify", value: "justify", icon: TextAlignJustifyLeftIcon },
];
