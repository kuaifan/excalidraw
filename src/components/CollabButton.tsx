import clsx from "clsx";
import { ToolButton } from "./ToolButton";
import { t } from "../i18n";
import { useIsMobile } from "../components/App";
import { users } from "./icons";

import "./CollabButton.scss";

const CollabButton = ({
  isCollaborating,
  collaboratorCount,
  onClick,
}: {
  isCollaborating: boolean;
  collaboratorCount: number;
  onClick: () => void;
}) => {
  return (
    <>
    </>
  );
};

export default CollabButton;
