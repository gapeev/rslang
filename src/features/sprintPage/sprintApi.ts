import { IWord } from '../../common/Interfaces';
import { instanceAxios } from '../../common/axios';
import { MAX_PAGES } from '../../common/Enums';

export function randomNumber() {
  let min = 0;
  console.log(Math.floor(min + Math.random() * (MAX_PAGES + 1 - min)));
  return Math.floor(min + Math.random() * (MAX_PAGES + 1 - min));
}

export async function getWordsSprint(difficult: string): Promise<IWord[]> {
  let resp;
  try {
    resp = await instanceAxios.get(
      `/words?group=${difficult}&page=${randomNumber()}`
    );
  } catch {
    console.log('req failed');
  } finally {
    console.log(resp?.data);
  }
  return resp?.data;
}
