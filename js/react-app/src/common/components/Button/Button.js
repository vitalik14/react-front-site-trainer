/* eslint-disable */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { node, nominalTypeHack } from 'prop-types';

export default withStyles({
    root: {
      border: 0,
      color: '#FFFFFF',
      height: '24px'
    },
    outlinedSecondary: {
      height: '24px',
      minHeight: 24,
      border: "1px solid #F5F5F5",
      borderRadius: 2,
      padding: '5px 8px',
      background: 'none',
      textTransform: 'uppercase',
      fontSize: 12,
      '&:hover':{
        backgroundColor: '#ffffff',
        color: '#304FFE',
        border: "1px solid #F5F5F5",
      }
    },
    contained:{
      borderRadius: 2,
      backgroundColor: "#EEEEEE",
      color: "#4D4D4E",
      '&:hover':{
        backgroundColor: "#CFD8DC"
      },
      '&:active':{
        backgroundColor: "#EEEEEE"
      }
    },
    containedSecondary:{
      borderRadius: 2,
      backgroundColor: "#FFFFFF",
      color: "#4D4D4E",
      '&:hover':{
        color: "#EC407A",
        backgroundColor: "#FFFFFF"
      },
      '&:active':{
        color: "#9E9E9E",
      }
    },
    containedPrimary:{
      backgroundColor: "#EC407A",
      color: "#fff",
      '&:hover':{
        backgroundColor: "#FF74A3"
      },
      '&:active':{
        backgroundColor: "#C91853",
      }
    },
    text: {
      color: "#EC407A",
      '&:hover':{
        color: '#fff',
        backgroundColor: "#EC407A"
      },
      '&:active':{
        color: "#C91853",
      }
    },
    textPrimary: {
      color: "#304FFE",
      '&:hover':{
        color: '#fff',
        backgroundColor: "#EC407A"
      },
      '&:active':{
        color: "#0D47A1",
      }
    },
    textSecondary: {
      color: "#4D4D4E",
      '&:hover':{
        color: '#4D4D4E',
        backgroundColor: "#EEEEEE"
      },
      '&:active':{
        color: "#CFD8DC",
      }
    },

    label: {
      textTransform: 'uppercase',
    },
  })(Button);
