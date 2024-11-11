import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { translations } from "./translations";

const i18n = new I18n(translations);

i18n.locale = Localization.locale.split('-')[0];
i18n.enableFallback = true;

export default i18n;