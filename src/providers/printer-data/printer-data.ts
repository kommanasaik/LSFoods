import { Injectable } from '@angular/core';
import EscPosEncoder from 'esc-pos-encoder-ionic';

/*
  Generated class for the PrinterDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrinterDataProvider {

  constructor() {
    console.log('Hello PrinterDataProvider Provider');
  }
  Initial(){
    this.encoding = null;
    const encoder = new EscPosEncoder();
    this.encoding = encoder.initialize();
  }

  public encoding: any;
  //width: number = 48;
  width: number = 32;

  charLength(char) {
    const code = char.charCodeAt(0);
    return code > 0x7f && code <= 0xffff ? 2 : 1; // More than 2bytes count as 2
  }

  encode(){
    return this.encoding.encode();
  }


  textLength(str) {
    return str.split('').reduce((accLen, char) => {
      return accLen + this.charLength(char);
    }, 0)
  }

  textSubstring(str, start, end) {
    let accLen = 0;
    return str.split('').reduce((accStr, char) => {
      accLen = accLen + this.charLength(char);
      return accStr + (accLen > start && (!end || accLen <= end) ? char : '');
    }, '')
  }
  TEXT_FORMAT = {

    TXT_NORMAL: '\x1b\x21\x00', // Normal text
    TXT_2HEIGHT: '\x1b\x21\x10', // Double height text
    TXT_2WIDTH: '\x1b\x21\x20', // Double width text
    TXT_4SQUARE: '\x1b\x21\x30', // Double width & height text

    TXT_CUSTOM_SIZE: function (width, height) { // other sizes
      width = width > 8 ? 8 : width;
      width = width < 1 ? 1 : width;
      height = height > 8 ? 8 : height;
      height = height < 1 ? 1 : height;

      var widthDec = (width - 1) * 16; // Values between 1-8
      var heightDec = height - 1; // Values between 1-8
      var sizeDec = widthDec + heightDec;
      /*
      * @todo I would suggest replacing the return line by the code below since
      *         `String.fromCharCode()` can generate undesirable results.
      *
      * return Buffer.from('1d21' + numToHexString(sizeDec), 'hex');
      * */
      return '\x1d\x21' + String.fromCharCode(sizeDec);
    },

    TXT_HEIGHT: {
      1: '\x00',
      2: '\x01',
      3: '\x02',
      4: '\x03',
      5: '\x04',
      6: '\x05',
      7: '\x06',
      8: '\x07'
    },
    TXT_WIDTH: {
      1: '\x00',
      2: '\x10',
      3: '\x20',
      4: '\x30',
      5: '\x40',
      6: '\x50',
      7: '\x60',
      8: '\x70'
    },

    TXT_UNDERL_OFF: '\x1b\x2d\x00', // Underline font OFF
    TXT_UNDERL_ON: '\x1b\x2d\x01', // Underline font 1-dot ON
    TXT_UNDERL2_ON: '\x1b\x2d\x02', // Underline font 2-dot ON
    TXT_BOLD_OFF: '\x1b\x45\x00', // Bold font OFF
    TXT_BOLD_ON: '\x1b\x45\x01', // Bold font ON
    TXT_ITALIC_OFF: '\x1b\x35', // Italic font ON
    TXT_ITALIC_ON: '\x1b\x34', // Italic font ON

    TXT_FONT_A: '\x1b\x4d\x00', // Font type A
    TXT_FONT_B: '\x1b\x4d\x01', // Font type B
    TXT_FONT_C: '\x1b\x4d\x02', // Font type C

    TXT_ALIGN_LT: '\x1b\x61\x00', // Left justification
    TXT_ALIGN_CT: '\x1b\x61\x01', // Centering
    TXT_ALIGN_RT: '\x1b\x61\x02', // Right justification
  };

  _getStyle(type) {
    let styled = ''
    switch (type.toUpperCase()) {
      case 'B':
        styled += this.TEXT_FORMAT.TXT_BOLD_ON
        styled += this.TEXT_FORMAT.TXT_ITALIC_OFF
        styled += this.TEXT_FORMAT.TXT_UNDERL_OFF
        break
      case 'I':
        styled += this.TEXT_FORMAT.TXT_BOLD_OFF
        styled += this.TEXT_FORMAT.TXT_ITALIC_ON
        styled += this.TEXT_FORMAT.TXT_UNDERL_OFF
        break
      case 'U':
        styled += this.TEXT_FORMAT.TXT_BOLD_OFF
        styled += this.TEXT_FORMAT.TXT_ITALIC_OFF
        styled += this.TEXT_FORMAT.TXT_UNDERL_ON
        break
      case 'U2':
        styled += this.TEXT_FORMAT.TXT_BOLD_OFF
        styled += this.TEXT_FORMAT.TXT_ITALIC_OFF
        styled += this.TEXT_FORMAT.TXT_UNDERL2_ON
        break

      case 'BI':
        styled += this.TEXT_FORMAT.TXT_BOLD_ON
        styled += this.TEXT_FORMAT.TXT_ITALIC_ON
        styled += this.TEXT_FORMAT.TXT_UNDERL_OFF
        break
      case 'BIU':
        styled += this.TEXT_FORMAT.TXT_BOLD_ON
        styled += this.TEXT_FORMAT.TXT_ITALIC_ON
        styled += this.TEXT_FORMAT.TXT_UNDERL_ON
        break
      case 'BIU2':
        styled += this.TEXT_FORMAT.TXT_BOLD_ON
        styled += this.TEXT_FORMAT.TXT_ITALIC_ON
        styled += this.TEXT_FORMAT.TXT_UNDERL2_ON
        break
      case 'BU':
        styled += this.TEXT_FORMAT.TXT_BOLD_ON
        styled += this.TEXT_FORMAT.TXT_ITALIC_OFF
        styled += this.TEXT_FORMAT.TXT_UNDERL_ON
        break
      case 'BU2':
        styled += this.TEXT_FORMAT.TXT_BOLD_ON
        styled += this.TEXT_FORMAT.TXT_ITALIC_OFF
        styled += this.TEXT_FORMAT.TXT_UNDERL2_ON
        break
      case 'IU':
        styled += this.TEXT_FORMAT.TXT_BOLD_OFF
        styled += this.TEXT_FORMAT.TXT_ITALIC_ON
        styled += this.TEXT_FORMAT.TXT_UNDERL_ON
        break
      case 'IU2':
        styled += this.TEXT_FORMAT.TXT_BOLD_OFF
        styled += this.TEXT_FORMAT.TXT_ITALIC_ON
        styled += this.TEXT_FORMAT.TXT_UNDERL2_ON
        break

      case 'NORMAL':
      default:
        styled += this.TEXT_FORMAT.TXT_BOLD_OFF
        styled += this.TEXT_FORMAT.TXT_ITALIC_OFF
        styled += this.TEXT_FORMAT.TXT_UNDERL_OFF
        break
    }
    return styled
  }

  tableCustom(data, options: any = {}) {
    options = options || { size: [], encoding: this.encoding }
    let [width = 1, height = 1] = options.size || []
    let baseWidth = Math.floor(this.width / width)
    let cellWidth = Math.floor(baseWidth / data.length)
    let leftoverSpace = baseWidth - cellWidth * data.length // by only data[].width
    let lineStr = ''
    let secondLineEnabled = false
    let secondLine = []
    for (let i = 0; i < data.length; i++) {
      let obj = data[i]
      let align = (obj.align || '').toUpperCase()
      let tooLong = false

      //console.log(obj)
      obj.text = obj.text.toString()
      let textLength = this.textLength(obj.text);
      if (obj.width) {
        cellWidth = baseWidth * obj.width
      } else if (obj.cols) {
        cellWidth = obj.cols / width
        leftoverSpace = 0;
      }
      if(align == 'LEFT'){
        cellWidth = 14;
      }else{
        cellWidth = 8;
      }
      console.log(cellWidth)
      //console.log(Math.ceil(cellWidth) + '-' +textLength)
      if (cellWidth < textLength) {
        tooLong = true
        obj.originalText = obj.text
        obj.text = this.textSubstring(obj.text, 0, cellWidth)
      }

      if (align === 'CENTER') {
        let spaces = (cellWidth - textLength) / 2
        for (let s = 0; s < spaces; s++) {
          lineStr += ' '
        }

        if (obj.text !== '') {
          if (obj.style) {
            lineStr += (
              this._getStyle(obj.style) +
              obj.text +
              this._getStyle("NORMAL")
            )
          } else {
            lineStr += obj.text
          }
        }

        for (let s = 0; s < spaces - 1; s++) {
          lineStr += ' '
        }
      } else if (align === 'RIGHT') {
        let spaces = cellWidth - textLength
        if (leftoverSpace > 0) {
          spaces += leftoverSpace
          leftoverSpace = 0
        }

        //console.log(leftoverSpace)
        for (let s = 0; s < spaces; s++) {
          lineStr += ' '
        }

        if (obj.text !== '') {
          if (obj.style) {
            lineStr += (
              this._getStyle(obj.style) +
              obj.text +
              this._getStyle("NORMAL")
            )
          } else {
            lineStr += obj.text
          }
        }
      } else {
        if (obj.text !== '') {
          if (obj.style) {
            lineStr += (
              this._getStyle(obj.style) +
              obj.text +
              this._getStyle("NORMAL")
            )
          } else {

            lineStr += obj.text
          }
        }

        let spaces = Math.floor(cellWidth - textLength)
        if (leftoverSpace > 0) {
          spaces += leftoverSpace
          leftoverSpace = 0
        }

        for (let s = 0; s < spaces; s++) {
          lineStr += ' '
        }
      }
      if (tooLong) {
        secondLineEnabled = true

        //obj.text = this.textSubstring(obj.originalText,obj.text.length, cellWidth)
        obj.text = this.textSubstring(obj.originalText, obj.text.length, obj.originalText.length)
        //console.log(obj.text)
        //console.log(obj.originalText.length)
        secondLine.push(obj)
      } else {
        obj.text = ''
        secondLine.push(obj)
      }
    }

    if (width > 1 || height > 1) {
      lineStr = (
        this.TEXT_FORMAT.TXT_CUSTOM_SIZE(width, height) +
        lineStr +
        this.TEXT_FORMAT.TXT_NORMAL
      )
    }
    //console.log(lineStr)
    this.encoding.custom(lineStr + '\n');
    //+ '\n'
    //console.log(secondLineEnabled)
    if (secondLineEnabled) {
      return this.tableCustom(secondLine, options)
    }

  }

}

