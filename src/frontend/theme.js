import 'typeface-ibm-plex-sans';

const reds = {
  red1: '#FF0000',
};

const blues = {
  blue1: '#232535',
  blue2: '#82B0FD',
  blue3: '#B4BFED',
  blue4: '#1B8FF5',
};

const yellows = {
  yellow1: '#FED138',
  yellow2: '#FED95A',
};

const blacks = {
  black1: '#000000',
  black2: '#465064',
  black3: '#1A1A1A',
};

const greys = {
  grey1: '#F5F5F5',
  grey2: '#C4C4C4',
  grey3: '#666666',
  grey4: 'B9B9B9',
};

const greens = {
  green1: '#BCDDD7',
  green2: '#8BC34A',
};

const purples = {
  purple1: '#C1B1E9',
  purple2: '#E1D9F6',
};

const white = '#FFFFFF';

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const bolds = {
  bold14: '700 14px IBM Plex Sans',
  bold16: '700 16px IBM Plex Sans',
  bold18: '700 18px IBM Plex Sans',
  bold20: '700 20px IBM Plex Sans',
  bold24: '700 24px IBM Plex Sans',
  bold30: '700 30px IBM Plex Sans',
  bold36: '700 36px IBM Plex Sans',
  bold48: '700 48px IBM Plex Sans',
  bold250: '700 250px IBM Plex Sans',
};

const mediums = {
  medium12: '400 12px IBM Plex Sans',
  medium14: '400 14px IBM Plex Sans',
  medium16: '400 16px IBM Plex Sans',
  medium18: '400 18px IBM Plex Sans',
  medium20: '400 20px IBM Plex Sans',
  medium24: '400 24px IBM Plex Sans',
  medium48: '400 48px IBM Plex Sans',
  medium72: '400 72px IBM Plex Sans',
};

const shadows = {
  shadow1: '0 2px 2px 0 rgba(0, 0, 0, 0.10)',
  shadow2: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
  shadow3: '0 8px 8px 0 rgba(0, 0, 0, 0.75)',
};

const borders = {
  solidBlack: '1px solid #000000',
  solidGrey1: '1px solid #c4c4c4',
  solidGrey2: '0.75px solid rgba(214, 220, 227, 0.5)',
  solidRed: '1px solid #FF0000',
};

export default {
  colours: {
    reds,
    blues,
    yellows,
    blacks,
    white,
    greys,
    greens,
    purples,
  },
  breakpoints,
  fonts: {
    ...bolds,
    ...mediums,
  },
  shadows,
  borders,
  pageMargin: '64px 82px 64px 82px',
  mobilePageMargin: '15px 30px 15px 30px',
};
