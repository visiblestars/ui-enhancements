import {create} from '@storybook/theming/create';
import defaultConfig from '../src/@apps/utility/ContextProvider/defaultConfig';

export default create({
  base: 'light',

  appContentBg: defaultConfig.theme.palette.background.default,

  // colorPrimary: 'hotpink',
  // colorSecondary: 'deepskyblue',
  //
  // // UI
  // appBg: 'silver',
  // appContentBg: 'silver',
  // appBorderColor: 'grey',
  // appBorderRadius: 4,
  //
  // // Typography
  fontBase: 'Poppins',
  // fontCode: 'monospace',
  //
  // // Text colors
  // textColor: 'black',
  // textInverseColor: 'rgba(255,255,255,0.9)',
  //
  // // Toolbar default and active colors
  // barTextColor: 'silver',
  // barSelectedColor: 'black',
  // barBg: 'hotpink',
  //
  // // Form colors
  // inputBg: 'white',
  // inputBorder: 'silver',
  // inputTextColor: 'black',
  // inputBorderRadius: 4,
  //
  brandTitle: 'Aathisoft',
  brandUrl: 'https://aathisoft.com',
  brandImage: 'https://aathisoft.com/content/img/logo.png',
});
