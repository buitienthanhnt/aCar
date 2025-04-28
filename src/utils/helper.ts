import {ValueCode} from '@type/DataType';

export function formatDate(date: string | Date, type = 'en-US'): string {
  return new Date(date).toLocaleDateString(type, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const formatPrice = (price: number, currency = 'vnđ'): string => {
  const giaTri = Math.abs(price);
  const ty = Math.floor(giaTri / 1000000);
  let sodu = giaTri - ty * 1000000;
  const trieu = Math.floor(sodu / 1000);
  sodu = sodu - trieu * 1000;
  const nghin = sodu;
  return `${ty ? ty + ' tỷ ' : ''}${trieu ? trieu + ' triệu ' : ''}${
    nghin ? nghin + ' nghìn' : ''
  } ${currency}`;
};

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const listYearKey = 'Y123456789ABCDEFGHJKLMNPRSTVWX';

export function otoYearProduction(key: string): string {
  let index = listYearKey.toLowerCase().search(key.toLowerCase());
  return index !== -1 ? (2000 + index).toString() : 'Không xác định';
}

export function otoCountry(key: string): string {
  switch (key[0].toLowerCase()) {
    case '1':
    case '4':
    case '5':
      return 'Mỹ';
    case 'w':
      return 'Đức';
    case 'j':
      return 'Nhật Bản';
    case '2':
      return 'Canada';
    case '9':
      return 'Brazil';
    case '3':
      return 'Mexico';
    case '6':
      return 'Australia';
    case 'y':
      return 'Thụy Điển';
    case 'z':
      return 'Italy';
    case 'l':
      return 'Trung Quốc';
    case 'r':
      if (!key[1]) {
        return '';
      }
      const re = /[a-e]/;
      if (re.test(key[1])) {
        return 'UAE';
      }
      return 'Việt Nam';
    case 'k':
      return 'Hàn Quốc';
    case 'm':
      return 'Ấn Độ';
    default:
      return '';
  }
}

export function formatVinCode(vinCode: string){
  return vinCode.toLowerCase().replaceAll('o', '0').replaceAll('q', '0').replaceAll('i', '1');
}

export const codeNumber = (text: string) => {
  let val: ValueCode[] = [];
  if (!text) {
    return val;
  }

  const re = /[A-Z]+[0-9]/;
  const extractData: string[] = text.split('\n');
  extractData?.forEach(item => {
    if (item.length >= 15 && re.test(item.replaceAll(' ', ''))) {
      item.split(' ').forEach(i => {
        if (i.length >= 15 && i.length < 18 && re.test(i.replaceAll(' ', ''))) {
          const index = 17 - i.length;
          val.push({
            textValue: formatVinCode(i).toUpperCase(),
            len: i.length,
            index: 9 - index,
            value: i[9 - index],
            yearValue: otoYearProduction(i[9 - index]),
          });
        }
      });
    }
  });
  return [val.pop()];
};
