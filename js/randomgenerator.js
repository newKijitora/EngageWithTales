/*************************************************
 * 乱数クラス
 *************************************************/

class RandomGenerator {
  // 第1引数: 生成したい乱数の最小値
  // 第2引数: 生成したい乱数の最大値
  static generate(min_number, max_number) {
    const order_max = (max_number != null) ? max_number : 1;
    const order_min = (min_number != null) ? min_number : 0;
    
    if (order_max < order_min) {
      order_max = order_min;
      order_min = (max_number != null) ? max_number : 0;
    }
    
    const random_number = Math.floor((Math.random() * ((order_max - order_min) + 1)) + order_min);
    return random_number;
  }
}
