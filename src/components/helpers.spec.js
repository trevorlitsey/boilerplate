import { convertObjToArr } from './helpers';

const obj = {
	one: {
		yes: 'yes',
	},
	two: {
		no: 'no',
	}
}

const arr = [
	{
		yes: 'yes',
	},
	{
		no: 'no',
	}
]

it('convertObjectToArr should covert obj to arr', () => {
	expect(convertObjToArr(obj)).toEqual(arr);
})