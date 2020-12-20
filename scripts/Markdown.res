let dir = Node.Path.join2(Sys.getcwd(), "/pages/writing")
let files =
  dir
  ->Node.Fs.readdirSync
  ->Belt.Array.keep(file => file->Js.String.endsWith(".md") || file->Js.String.endsWith(".mdx"))

type articleData = {
  description: string,
  index: int,
  path: string,
  published: string,
  title: string,
}

@bs.val external eval: string => Js.Nullable.t<'a> = "eval"

let default = files
->Belt.Array.mapWithIndex((index, file) => {
  let name = Node.Path.join2(dir, file)
  let match =
    %re("/export\\s+let\\s+meta\\s+=\\s+({[\\s\\S]*?\\n})/")
    ->Js.Re.exec_(Node.Fs.readFileSync(name, #utf8))
    ->Belt.Option.mapWithDefault([], Js.Re.captures)

  if Js.Array.length(match) < 1 || Js.typeof(match[1]) === "string" {
    Js.Exn.raiseError(name ++ " needs to export let meta = {}")
  }

  let meta = switch Js.Nullable.toOption(match[1]) {
  | Some(result) => eval("(" ++ result ++ ")")
  | _ => Js.Nullable.null
  }

  switch Js.Nullable.toOption(meta) {
  | Some(data) =>
    Some({
      ...data,
      path: "/writing/" ++ %re("/\\.mdx?$/")->Js.String.replaceByRe("", file),
      index: index,
    })
  | _ => None
  }
})
->Belt.Array.keep(meta => {
  switch meta {
  | Some(data) => data.published->Js.String.length > 1
  | _ => false
  }
})
->Belt.SortArray.stableSortBy((a, b) => {
  switch (a, b) {
  | (Some(a), Some(b)) =>
    b.published->Js.Date.fromString->Js.Date.toDateString->int_of_string -
      a.published->Js.Date.fromString->Js.Date.toDateString->int_of_string
  | _ => 0
  }
})
