export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

export const canvasSize: { width: number, height: number } = {
  width: screenWidth <= 520 ? 300 : 500,
  height: screenHeight <= 930 ? 400 : 600,
};

export const canvasColor: string = 'rgb(223, 223, 223)';

export const linesWidth: { value: string, id: string }[] = [
  { value: '1px', id: '1px' },
  { value: '2px', id: '2px' },
  { value: '3px', id: '3px' },
  { value: '4px', id: '4px' },
  { value: '5px', id: '5px' },
  { value: '6px', id: '6px' },
  { value: '7px', id: '7px' },
  { value: '8px', id: '8px' },
  { value: '9px', id: '9px' },
  { value: '10px', id: '10px' },
];
