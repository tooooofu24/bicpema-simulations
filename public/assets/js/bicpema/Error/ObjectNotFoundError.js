/**
 * 対象のidを持つオブジェクトが存在しない場合の例外です。
 */
export class ObjectByIdNotFoundError extends Error {
  /**
   * コンストラクタ。
   * @param {number} id html要素のid
   */
  constructor(id) {
    super(id + " をidに持つhtml要素がありません。");
  }
}
