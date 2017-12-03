import test from "ava";
import TabTitles from "../src/background/TabTitles";

test("split", t => {
  const target = new TabTitles(["\\[", "\\]", " "]);
  t.deepEqual(
    ["", "[", "foo", "]", "", " ", "bar", " ", "baz"],
    target.split("[foo] bar baz")
  );
});

test("update, remove, refresh", t => {
  const target = new TabTitles([" "]);

  t.deepEqual([], target.update(101, "abc def ghi"));
  t.is("abc def ghi", target.title(101));
  
  t.deepEqual(['101', '102'], target.update(102, "abc ghi"));
  t.is("def ghi", target.title(101));
  t.is("ghi", target.title(102));

  t.deepEqual(['103'], target.update(103, "abc jkl"));
  t.is("def ghi", target.title(101));
  t.is("ghi", target.title(102));
  t.is("jkl", target.title(103));

  t.deepEqual([], target.update(104, "aaa bbb"));
  t.is("def ghi", target.title(101));
  t.is("ghi", target.title(102));
  t.is("jkl", target.title(103));
  t.is("aaa bbb", target.title(104));

  t.deepEqual([], target.remove(101));
  t.deepEqual(['103'], target.remove(102));
  t.is('abc jkl', target.title(103));

  t.deepEqual(['103', '104'], target.update(104, "abc bbb"));
  t.is("jkl", target.title(103));
  t.is("bbb", target.title(104));
});
