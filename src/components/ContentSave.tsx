import { useState } from "react";
import { t } from "../i18n";
import { useIsMobile } from "./App";
import {save} from "./icons";
import { ToolButton } from "./ToolButton";
import "./ContentSave.scss";
const ContentSave = ({ onConfirm }: { onConfirm: () => void }) => {
  const [showDialog, setShowDialog] = useState(false);
  const toggleDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
    }, 2000);
  };

  return (
    <>
      <ToolButton
        type="button"
        icon={save}
        title={t("buttons.saveContent")}
        aria-label={t("buttons.saveContent")}
        showAriaLabel={useIsMobile()}
        onClick={toggleDialog}
        data-testid="save-button"
      />

      {showDialog && (
        <div className="ContentSave__fileName"> {t("alerts.theSaved")}</div>
      )}
    </>
  );
};

export default ContentSave;
