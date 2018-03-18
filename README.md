# ust2json
Convert UTAU Sequence Text and JSON to each other. 

UST情報(UTAU)とJSONを相互変換します。

WEB開発の感覚でUTAUを編集できたらなーと思って作りました。

詳細なドキュメントはそのうちつくります。

# Install
```
git clone https://github.com/katai5plate/ust2json
```

# memo: SESSION
- VERSION
- SETTING
- PREV
- 0000 : 数字の意味はなく、順序を評価
- ( INSERT : 数字の間 )
- ( DELETE : 数字の代わり )
- NEXT
- < TRACKEND >

# memo: jsAPI
## JSON文字列がある状態で実行するとテキストエリアに反映

### 歌詞がすべて「あ」になる。
mapNumを使うことで数字セッションの一括処理ができる。
```js
U2J.send(U2J.mapNums(U2J.jget(),v=>{v.Lyric="あ"}));
```

### プラマイ１２音階ランダムでずらす
```js
U2J.send(U2J.mapNums(U2J.jget(),v=>{v.NoteNum+=((Math.random()*24)-12)>>0}));
```

### エンベロープ情報を追記する
配列ではなく文字列。
```js
U2J.send(U2J.mapNums(U2J.jget(),v=>{v.Envelope="0,20,146,0,181,97,0"}));
```

### エンベロープ情報を分析する
aggreNumsで数字セッションの分析ができる
```js
var data = U2J.aggreNums(U2J.jget());
```
このJSONをクリップボードにコピーする
```js
U2J.clip(JSON.stringify(U2J.aggreNums(U2J.jget())));
```
|構成|内容|
|:-|:-|
|歌詞||
|　＋－leng||
|　＋－note||
|　＋－preu||
|　＋－overlap||
|　＋－intensity||
|　＋－mod||
|　＋－stp||
|　＋－env||
|　｜　＋－p1||
|　｜　＋－p2||
|　｜　＋－p3||
|　｜　＋－v1||
|　｜　＋－v2||
|　｜　＋－v3||
|　｜　＋－v4||
|　｜　＋－p4||
|　｜　＋－v5||
|　｜　＼－p5||
|　｜||
|　＋－velocity||
|　＼－pit||
|　　　＋－leng||
|　　　＋－freq||
|　　　＋－cent||
|　　　＋－from||
|　　　＋－to||
|　　　＋－phase||
|　　　＼－height||
