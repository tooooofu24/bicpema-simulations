# bicpema-simulations

bicpema の実験データを置くリポジトリ

### ディレクトリ構成

```
.github GitHubの設定ディレクトリ
public  GitHub Pagesの公開ディレクトリ
  ├─articles 紀要論文のPDF
  ├─assets 共通ファイルを置く
  │  ├─css
  │  └─js
  ├─simulations 実験データ ← ここに実験データを追加する
  ├─404.html 404ページ
  └─index.html トップページ
.editorconfig エディタの設定ファイル
.firebaserc Firebaseの設定ファイル
.gitignore Gitの設定ファイル
firebase.json Firebaseの設定ファイル
README.md このファイル
```

### 実験の追加

1. `public/simulations` に実験のディレクトリを作成する
2. js ファイルや html ファイルを配置する。（`public/assets` ディレクトリを参照する場合、`/assets` から始めることに注意する）
3. Git で`main`ブランチにコミット、プッシュする
4. https://bicpema.web.app/simulations/実験のディレクトリ名 で確認する

### その他

- デプロイの状況は https://github.com/tooooofu24/bicpema-simulations/actions で確認できる
- `public`ディレクトリ以外は基本的に変更しない
- `public`ディレクトリ以下にディレクトリを作成する場合は**ケバブケース（kebab-case）**で作成すること。例：`projectile-motion`, `wave-interference` など
