const iconParams = {
  face: 'FontAwesome',
  size: 45
};

export default {
  'default': {
    shape: 'icon',
    icon: {
      ...iconParams,
      color: 'gray',
      code: '\uf10c'  //fa-circle-o
    }
  },
  'database': {
    shape: 'icon',
    icon: {
      ...iconParams,
      color: 'goldenrod',
      code: '\uf1c0'  //fa-database
    }
  },
  'application/mobile': {
    shape: 'icon',
    icon: {
      ...iconParams,
      color: 'gray',
      code: '\uf10b'  //fa-mobile 
    }
  },
  'application/mobile/android': {
    shape: 'icon',
    icon: {
      ...iconParams,
      color: 'green',
      code: '\uf10b'  //fa-mobile
    }
  },
  'message-broker': {
    shape: 'icon',
    icon: {
      ...iconParams,
      color: 'red',
      code: '\uf01c'  //fa-inbox
    }
  }
};