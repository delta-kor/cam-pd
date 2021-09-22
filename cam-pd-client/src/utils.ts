class Utils {
  static addComma(number: number | null, fallout: string = '0'): string {
    return number ? number.toLocaleString('ko') : fallout;
  }
}

export default Utils;
