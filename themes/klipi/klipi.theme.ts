// The klipi theme. `astryx experimental theme editor` wrote this file once and never changes it again.
// The checked settings live in klipi.settings.json and the generated klipi.settings.ts;
// change them with `astryx experimental theme editor set klipi ...`. Add your own changes below: they win over the settings.
import {defineTheme} from '@astryxdesign/core/theme';
import {klipiSettings} from './klipi.settings';

export const klipiTheme = defineTheme({
  extends: klipiSettings,
  name: 'klipi',
});
