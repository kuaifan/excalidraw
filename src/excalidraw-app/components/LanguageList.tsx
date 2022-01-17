import React from "react";
import * as i18n from "../../i18n";

export const LanguageList = ({
  onChange,
  languages = i18n.languages,
  currentLangCode = i18n.getLanguage().code,
}: {
  languages?: { code: string; label: string }[];
  onChange: (langCode: i18n.Language["code"]) => void;
  currentLangCode?: i18n.Language["code"];
}) => (
  <React.Fragment>

  </React.Fragment>
);
