# Napier client

[Napier](https://github.com/waspcojp/napier) は websocketを使った逆プロキシのシステムです。

Napier clientは、Napierサーバに接続するためのクライアントです。

## 概要

Napierについての説明は、[Napier](https://github.com/waspcojp/napier)をご覧下さい。

## クイックスタート

### インストール

#### コマンドラインクライアント

コマンドラインクライアントのリリースファイルは存在しません。

以下のようにすると、コマンドラインのクライアントが作成できます。

```shell
$ git clone https://github.com/waspcojp/napier-client.git
$ npm update
```

#### GUIクライアント

GUIクライアントはWindows(x86_64)版のみリリースしています。

インストーラをダウンロードして起動するとインストールされます。

### 起動

#### コマンドラインクライアント起動

クライアントを接続するには、

```shell
$ npm run cli -- <options>
```

のように実行します。起動オプションは、

```
Usage: napier-cli [options] [profileName]

Arguments:
  profileName                        profile name (default: "default")

Options:
  --config <config filename>         config file
  --user <user>                      user name
  --password <pass>                  password
  --host <host>                      tunnel host
  --port <port>                      tunnel port
  --local-port <localPort>           local port
  --re-connect                       re-connect server
  --web-server                       start web server
  --server-config <config filename>  web server config file
  --document-root <path>             web server document root
  --index                            list index
```

このうち、必ず指定するものは、`--user`, `--password`, `--host`です。

コマンドラインで指定するオプションは、

```javascript
{
    "host": "www.napier-net.com",
    "localPort": 4001,
    "reConnect": true,
    "webServer": false,
    "user": "****",
    "password": "****",
    "documentRoot": "."
}
```

のようにファイルに格納して`--config`で指定することも可能です。

コマンドラインの最後は「プロファイル」の指定です。指定しない場合はdefaultが指定されたことになります。

`--web-server`を指定すると、組み込みウェブサーバが起動します。`--document-root`で指定したディレクトリをdocument rootとするウェブサーバが起動され、プロキシ経由で外からアクセス可能になります。`--document-root`を指定しない場合は、クライアントを起動したディレクトリがdocument rootとなりますのでご注意下さい。

#### GUIクライアント起動

普通のアプリの起動と同じです。

コマンドライン版で指定するオプションは、クライアント内で設定できるようになっています。

## サービスサイト

[サービスサイト](https://www.napier-net.com)を作りましたので、すぐに試してみることができます。

サイトにアクセスしてユーザ登録等を行った後にクライアント起動すると試すことが可能です。サービスサイトの使い方については、サービスサイトの方をアクセスしてご覧下さい。

## 補足説明

### デフォルトプロファイルについて

デフォルトプロファイルを指定した場合(=プロファイルを指定しない場合)にプロキシされるURLがどのようになるかはサーバの設定に依りますが、通常の設定では

```
(http|https)://<ユーザ名>.<サーバのドメイン名>/
```

となることが多いです(サーバのデフォルト設定がこうなっています)。

[Napier-NET](https://www.napier-net.com/)の場合は、

```
(http|https)://<ユーザ名>.napier-net.com/
```

となります。

Napier-NETの場合は、デフォルトプロファイルでのHTTPSでの証明書はNapier-NETのものになります。この証明書はワイルドカード証明書です。

### 組み込みウェブサーバについて

コマンドラインで`--web-server`を指定すると、組み込みウェブサーバが起動します。

組み込みウェブサーバの設定は、`--server-config`で指定したファイルにあるものとします。ない場合はデフォルトの設定となります。

現在指定可能なものは、

| キー | 意味 | デフォルト |
|------|-----|-----------|
| public | documentRootと同じ | '.' |
| index  | ディレクトリのインデクスを表示するかどうか | false |
| symlinks | シンボリックリンクの追跡をするかどうか | false |

つまり、

```javascript
{
  "public": ".",
  "index": false,
  "symlinks": false
}
```

と書かれたファイルが指定されたのと同じとなります。

組み込みウェブサーバは、MarkDownのファイル(拡張子は.md)があると、自動的にHTMLにレンダリングしたものを送信します。

組み込みウェブサーバは、`localPort`で指定したポートを開きます。つまり、Napierによって開かれたグローバルの入口の他に、ローカルの入口を持ちます。必要であれば、他のNapierクライアントをこのポートに対して接続することも出来ます。

現在のウェブサーバは`GET`しか処理をしませんので、外部からファイルを変更したり削除したりすることはできませんが、`documentRoot`以下のファイルを**参照**することは出来ますから、公開できないファイルを置かないようにしましょう。

このウェブサーバはごく簡易なものです。想定している利用シーンは、仲間内でのファイルの交換程度の使い方です。より本格的なウェブサービスが必要な人は、それなりのアプリを別途起動するようにして下さい。