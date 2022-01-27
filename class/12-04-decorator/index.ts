// function tempDecorator(aaa) {
//   let a: number = 10;

//   console.log(aaa);
//   console.log(aaa);
//   console.log(aaa);
// }

// @tempDecorator
// class AppController {}

interface ICreateBoardInput {
  writer: string;
  title: string;
  contents: string;
}

const createBoardInput: ICreateBoardInput = {
  writer: "temp writer",
  title: "temp title",
  contents: "temp contents",
};
type boardPreview = Omit<ICreateBoardInput, "title">;

const createBoardInput2: Omit<ICreateBoardInput, "title"> = {
  writer: "temp writer",
  contents: "temp contents",
};

let b: number = 10;
console.log(b);
 