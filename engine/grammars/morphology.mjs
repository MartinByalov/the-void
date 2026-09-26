const R=(x,y,w,h,role="body")=>({kind:"rect",x,y,w,h,role});
const P=(x,y,role="detail")=>R(x,y,1,1,role);

const exact = {
 "CRT": [
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 16,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 11,
   "h": 8,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 7,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 11,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 18,
   "w": 8,
   "h": 2,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 20,
   "w": 12,
   "h": 2,
   "role": "base"
  }
 ],
 "TELEPHONE": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 16,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 6,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 12,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 12,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 15,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 14,
   "w": 2,
   "h": 4,
   "role": "shade"
  }
 ],
 "FLOPPY": [
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 14,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 8,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 5,
   "w": 2,
   "h": 4,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 18,
   "w": 2,
   "h": 2,
   "role": "void"
  }
 ],
 "RADIO": [
  {
   kind:"rect",
   "x": 4,
   "y": 7,
   "w": 16,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 8,
   "h": 8,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 13,
   "w": 3,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 3,
   "w": 1,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 6,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 6,
   "h": 1,
   "role": "accent"
  }
 ],
 "CAMERA": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 8,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 11,
   "w": 4,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "CALCULATOR": [
  {
   kind:"rect",
   "x": 6,
   "y": 3,
   "w": 12,
   "h": 18,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 4,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 10,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 13,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 16,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 16,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 16,
   "w": 2,
   "h": 2,
   "role": "accent"
  }
 ],
 "CLOCK": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 10,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 11,
   "w": 3,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 18,
   "w": 8,
   "h": 2,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 2,
   "w": 6,
   "h": 2,
   "role": "shade"
  }
 ],
 "CASSETTE_PLAYER": [
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 16,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 6,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 15,
   "w": 12,
   "h": 2,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 7,
   "w": 1,
   "h": 4,
   "role": "accent"
  }
 ],
 "ROUTER": [
  {
   kind:"rect",
   "x": 4,
   "y": 12,
   "w": 16,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 2,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 15,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 15,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 15,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 1,
   "h": 7,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 1,
   "h": 7,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 5,
   "w": 1,
   "h": 7,
   "role": "outline"
  }
 ],
 "KEYBOARD": [
  {
   kind:"rect",
   "x": 3,
   "y": 10,
   "w": 18,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 14,
   "h": 4,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 2,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 12,
   "w": 2,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 12,
   "w": 2,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 12,
   "w": 2,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 8,
   "h": 1,
   "role": "accent"
  }
 ],
 "PAGER": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 4,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 3,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 14,
   "w": 3,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 14,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 3,
   "h": 1,
   "role": "shade"
  }
 ],
 "MODEM": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 12,
   "h": 3,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 7,
   "w": 1,
   "h": 4,
   "role": "outline"
  }
 ],
 "PRINTER": [
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 16,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 15,
   "w": 10,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "SCANNER": [
  {
   kind:"rect",
   "x": 4,
   "y": 11,
   "w": 16,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 12,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 12,
   "w": 2,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "PROJECTOR": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 11,
   "w": 4,
   "h": 5,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 12,
   "w": 2,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 7,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 18,
   "w": 2,
   "h": 2,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 18,
   "w": 2,
   "h": 2,
   "role": "base"
  }
 ],
 "MONITOR": [
  {
   kind:"rect",
   "x": 4,
   "y": 4,
   "w": 16,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 8,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 16,
   "w": 2,
   "h": 4,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 20,
   "w": 8,
   "h": 2,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "JOYSTICK": [
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 7,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 16,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 16,
   "w": 2,
   "h": 2,
   "role": "accent"
  }
 ],
 "GAMEPAD": [
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 16,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 11,
   "w": 4,
   "h": 4,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 2,
   "h": 6,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 11,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 13,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 12,
   "w": 4,
   "h": 2,
   "role": "shade"
  }
 ],
 "MOUSE_DEVICE": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 1,
   "h": 4,
   "role": "outline"
  }
 ],
 "TAPE_RECORDER": [
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 16,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 5,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 8,
   "w": 5,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 2,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 9,
   "w": 2,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 8,
   "w": 1,
   "h": 4,
   "role": "accent"
  }
 ],
 "INTERCOM": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 6,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 13,
   "w": 4,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "ANSWERING_MACHINE": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 6,
   "h": 4,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 10,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "TYPEWRITER": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 12,
   "h": 4,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 10,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 3,
   "y": 6,
   "w": 2,
   "h": 2,
   "role": "outline"
  }
 ],
 "TERMINAL": [
  {
   kind:"rect",
   "x": 4,
   "y": 4,
   "w": 16,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 7,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 15,
   "w": 4,
   "h": 2,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 3,
   "y": 17,
   "w": 18,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 18,
   "w": 14,
   "h": 2,
   "role": "inset"
  }
 ],
 "OSCILLOSCOPE": [
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 16,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 9,
   "h": 8,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 7,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 7,
   "w": 3,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 12,
   "w": 3,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 18,
   "w": 8,
   "h": 2,
   "role": "base"
  }
 ],
 "MUG": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 9,
   "w": 3,
   "h": 7,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 10,
   "w": 2,
   "h": 5,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 8,
   "h": 3,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 16,
   "w": 8,
   "h": 2,
   "role": "shade"
  }
 ],
 "BOTTLE": [
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 2,
   "w": 4,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 3,
   "h": 9,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 18,
   "w": 10,
   "h": 2,
   "role": "shade"
  }
 ],
 "JAR": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 8,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 18,
   "w": 10,
   "h": 2,
   "role": "shade"
  }
 ],
 "TEAPOT": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 11,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 7,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 3,
   "y": 9,
   "w": 5,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 8,
   "w": 4,
   "h": 7,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 9,
   "w": 2,
   "h": 5,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 16,
   "w": 9,
   "h": 2,
   "role": "shade"
  }
 ],
 "CUP": [
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 11,
   "w": 2,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 2,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 17,
   "w": 14,
   "h": 2,
   "role": "base"
  }
 ],
 "CAN": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 2,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 3,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 17,
   "w": 8,
   "h": 2,
   "role": "shade"
  }
 ],
 "FLASK": [
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 2,
   "w": 6,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 18,
   "w": 12,
   "h": 2,
   "role": "shade"
  }
 ],
 "KETTLE": [
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 3,
   "w": 8,
   "h": 2,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 3,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 10,
   "h": 2,
   "role": "shade"
  }
 ],
 "BOWL": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 3,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 16,
   "w": 8,
   "h": 2,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 3,
   "role": "bright"
  }
 ],
 "THERMOS": [
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 2,
   "w": 6,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 12,
   "w": 2,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 18,
   "w": 8,
   "h": 2,
   "role": "shade"
  }
 ],
 "VASE": [
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 3,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 6,
   "w": 4,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 12,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 18,
   "w": 8,
   "h": 2,
   "role": "base"
  }
 ],
 "BUCKET": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 3,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 14,
   "h": 2,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 2,
   "h": 6,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 4,
   "w": 2,
   "h": 6,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 17,
   "w": 8,
   "h": 2,
   "role": "shade"
  }
 ],
 "PITCHER": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 6,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 8,
   "w": 4,
   "h": 8,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 9,
   "w": 2,
   "h": 6,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 17,
   "w": 8,
   "h": 2,
   "role": "shade"
  }
 ],
 "GOBLET": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 2,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 17,
   "w": 8,
   "h": 3,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 6,
   "w": 6,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 13,
   "w": 4,
   "h": 2,
   "role": "accent"
  }
 ],
 "TANKARD": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 3,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 8,
   "w": 3,
   "h": 8,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 9,
   "w": 2,
   "h": 6,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 10,
   "h": 2,
   "role": "shade"
  }
 ],
 "CARAFE": [
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 2,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 10,
   "h": 2,
   "role": "base"
  }
 ],
 "CANTEEN": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 4,
   "role": "bright"
  }
 ],
 "BARREL": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 2,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 15,
   "w": 14,
   "h": 2,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 18,
   "w": 10,
   "h": 2,
   "role": "shade"
  }
 ],
 "URN": [
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 3,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 8,
   "w": 3,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 16,
   "w": 8,
   "h": 3,
   "role": "base"
  }
 ],
 "BASIN": [
  {
   kind:"rect",
   "x": 4,
   "y": 11,
   "w": 16,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 3,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 16,
   "w": 10,
   "h": 2,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 3,
   "role": "bright"
  }
 ],
 "JUG": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 9,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 3,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 7,
   "w": 3,
   "h": 6,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 8,
   "w": 2,
   "h": 4,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 16,
   "w": 9,
   "h": 2,
   "role": "shade"
  }
 ],
 "TIN": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "AMPHORA": [
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 3,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 3,
   "h": 7,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 7,
   "w": 3,
   "h": 7,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 18,
   "w": 4,
   "h": 3,
   "role": "base"
  }
 ],
 "SHAKER": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 2,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 2,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 2,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "LUNCHBOX": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 12,
   "w": 14,
   "h": 2,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 2,
   "h": 3,
   "role": "accent"
  }
 ],
 "KEY": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 10,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 14,
   "w": 2,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 20,
   "y": 14,
   "w": 1,
   "h": 2,
   "role": "body"
  }
 ],
 "HAMMER": [
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 8,
   "w": 4,
   "h": 13,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 2,
   "h": 9,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 4,
   "w": 3,
   "h": 3,
   "role": "accent"
  }
 ],
 "WRENCH": [
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 6,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 2,
   "h": 4,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 8,
   "w": 4,
   "h": 10,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 16,
   "w": 6,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 17,
   "w": 2,
   "h": 4,
   "role": "void"
  }
 ],
 "SCREWDRIVER": [
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 2,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 18,
   "w": 4,
   "h": 2,
   "role": "accent"
  }
 ],
 "SCISSORS": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 3,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 4,
   "w": 3,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 15,
   "w": 5,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 15,
   "w": 5,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 3,
   "h": 3,
   "role": "void"
  }
 ],
 "SHOVEL": [
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 10,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 19,
   "w": 6,
   "h": 2,
   "role": "accent"
  }
 ],
 "BRUSH": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 12,
   "w": 4,
   "h": 9,
   "role": "shade"
  }
 ],
 "FLASHLIGHT": [
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 18,
   "w": 8,
   "h": 2,
   "role": "shade"
  }
 ],
 "MAGNET": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 4,
   "h": 13,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 5,
   "w": 4,
   "h": 13,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 15,
   "w": 12,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 4,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 5,
   "w": 4,
   "h": 3,
   "role": "bright"
  }
 ],
 "PADLOCK": [
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 6,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 4,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 2,
   "h": 4,
   "role": "void"
  }
 ],
 "PLIERS": [
  {
   kind:"rect",
   "x": 7,
   "y": 3,
   "w": 4,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 3,
   "w": 4,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 3,
   "h": 10,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 11,
   "w": 3,
   "h": 10,
   "role": "accent"
  }
 ],
 "SAW": [
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 4,
   "h": 12,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 2,
   "h": 4,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 13,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 13,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "CHISEL": [
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 2,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 18,
   "w": 6,
   "h": 2,
   "role": "accent"
  }
 ],
 "DRILL": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 8,
   "w": 4,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 4,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "TAPE_MEASURE": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 11,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 13,
   "w": 4,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 5,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "STAPLER": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 14,
   "w": 16,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 9,
   "w": 3,
   "h": 4,
   "role": "accent"
  }
 ],
 "CLAMP": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 3,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 15,
   "w": 12,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 8,
   "w": 2,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 15,
   "w": 4,
   "h": 4,
   "role": "shade"
  }
 ],
 "TROWEL": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 2,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 6,
   "h": 5,
   "role": "shade"
  }
 ],
 "RAKE": [
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 16,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 13,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "PICKAXE": [
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 16,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 13,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 19,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "CROWBAR": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 5,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 6,
   "w": 2,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 19,
   "w": 5,
   "h": 2,
   "role": "bright"
  }
 ],
 "TWEEZERS": [
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 2,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 7,
   "w": 2,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 19,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 19,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "WHISK": [
  {
   kind:"rect",
   "x": 10,
   "y": 13,
   "w": 4,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 9,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 2,
   "h": 7,
   "role": "void"
  }
 ],
 "LADLE": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 12,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 10,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 16,
   "w": 6,
   "h": 3,
   "role": "bright"
  }
 ],
 "OPENER": [
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 13,
   "w": 4,
   "h": 4,
   "role": "void"
  }
 ],
 "SWORD": [
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 14,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 1,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 15,
   "w": 10,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 17,
   "w": 4,
   "h": 5,
   "role": "shade"
  }
 ],
 "DAGGER": [
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 12,
   "w": 6,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 14,
   "w": 2,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 19,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "SPEAR": [
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 14,
   "role": "shade"
  }
 ],
 "AXE": [
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 18,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 9,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 3,
   "h": 3,
   "role": "bright"
  }
 ],
 "MACE": [
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 2,
   "h": 10,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "SHIELD": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 16,
   "w": 8,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 20,
   "w": 4,
   "h": 2,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 12,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 2,
   "role": "accent"
  }
 ],
 "BOW": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 3,
   "h": 16,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 4,
   "w": 2,
   "h": 16,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 3,
   "h": 2,
   "role": "accent"
  }
 ],
 "ARROW": [
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 13,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 18,
   "w": 6,
   "h": 3,
   "role": "accent"
  }
 ],
 "HELMET": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 7,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 16,
   "w": 10,
   "h": 2,
   "role": "shade"
  }
 ],
 "GAUNTLET": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "SABER": [
  {
   kind:"rect",
   "x": 12,
   "y": 3,
   "w": 2,
   "h": 12,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 6,
   "w": 2,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 15,
   "w": 6,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 17,
   "w": 3,
   "h": 4,
   "role": "shade"
  }
 ],
 "RAPIER": [
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 1,
   "h": 14,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 6,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 17,
   "w": 2,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 8,
   "h": 1,
   "role": "bright"
  }
 ],
 "LANCE": [
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 12,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 8,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 17,
   "w": 2,
   "h": 5,
   "role": "shade"
  }
 ],
 "HALBERD": [
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 6,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 5,
   "w": 3,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 14,
   "role": "shade"
  }
 ],
 "CLUB": [
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 13,
   "w": 4,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "SLING": [
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 2,
   "h": 10,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 4,
   "w": 2,
   "h": 10,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "CROSSBOW": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 16,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 6,
   "h": 2,
   "role": "accent"
  }
 ],
 "SCABBARD": [
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 16,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 18,
   "w": 6,
   "h": 2,
   "role": "accent"
  }
 ],
 "BUCKLER": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "TRIDENT": [
  {
   kind:"rect",
   "x": 7,
   "y": 3,
   "w": 2,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 3,
   "w": 2,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 2,
   "h": 12,
   "role": "shade"
  }
 ],
 "FLAIL": [
  {
   kind:"rect",
   "x": 9,
   "y": 14,
   "w": 4,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 2,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 8,
   "w": 2,
   "h": 3,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 4,
   "w": 5,
   "h": 5,
   "role": "bright"
  }
 ],
 "BATTLE_AXE": [
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 18,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 5,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "KITE_SHIELD": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 17,
   "w": 6,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 16,
   "role": "accent"
  }
 ],
 "CEREMONIAL_BLADE": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 12,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 8,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 16,
   "w": 4,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 17,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "BROKEN_BLADE": [
  {
   kind:"rect",
   "x": 11,
   "y": 7,
   "w": 2,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 10,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 16,
   "w": 4,
   "h": 5,
   "role": "shade"
  }
 ],
 "FROG": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 5,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 14,
   "w": 5,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "CAT": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 13,
   "w": 12,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 14,
   "w": 3,
   "h": 6,
   "role": "shade"
  }
 ],
 "DOG": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 9,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 3,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 12,
   "w": 3,
   "h": 4,
   "role": "shade"
  }
 ],
 "RABBIT": [
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 10,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 3,
   "w": 3,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 3,
   "w": 3,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "MOUSE": [
  {
   kind:"rect",
   "x": 9,
   "y": 11,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 4,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 14,
   "w": 5,
   "h": 2,
   "role": "outline"
  }
 ],
 "FISH": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 12,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 7,
   "w": 5,
   "h": 11,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 11,
   "w": 3,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "BIRD": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 4,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 15,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "TURTLE": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 3,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 10,
   "w": 3,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 15,
   "w": 3,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 15,
   "w": 3,
   "h": 3,
   "role": "shade"
  }
 ],
 "SNAIL": [
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 14,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 5,
   "h": 5,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "BEETLE": [
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 10,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 3,
   "h": 2,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 8,
   "w": 3,
   "h": 2,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 13,
   "w": 3,
   "h": 2,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 13,
   "w": 3,
   "h": 2,
   "role": "outline"
  }
 ],
 "MOTH": [
  {
   kind:"rect",
   "x": 10,
   "y": 7,
   "w": 4,
   "h": 10,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 7,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 6,
   "w": 7,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 5,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 12,
   "w": 5,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "BUTTERFLY": [
  {
   kind:"rect",
   "x": 11,
   "y": 7,
   "w": 2,
   "h": 11,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 7,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 5,
   "w": 7,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 5,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 12,
   "w": 5,
   "h": 5,
   "role": "body"
  }
 ],
 "SPIDER": [
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 6,
   "w": 4,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 5,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 5,
   "w": 5,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 13,
   "w": 5,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 13,
   "w": 5,
   "h": 4,
   "role": "outline"
  }
 ],
 "CRAB": [
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 4,
   "h": 5,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 5,
   "w": 4,
   "h": 5,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 15,
   "w": 3,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 15,
   "w": 3,
   "h": 3,
   "role": "shade"
  }
 ],
 "OCTOPUS": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 13,
   "w": 3,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 13,
   "w": 3,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 13,
   "w": 3,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 13,
   "w": 3,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "LIZARD": [
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 4,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 7,
   "w": 4,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 14,
   "w": 4,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 14,
   "w": 4,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 16,
   "w": 2,
   "h": 5,
   "role": "shade"
  }
 ],
 "SNAKE": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 9,
   "w": 4,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 10,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 4,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 5,
   "w": 3,
   "h": 3,
   "role": "accent"
  }
 ],
 "BAT": [
  {
   kind:"rect",
   "x": 10,
   "y": 9,
   "w": 4,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 3,
   "y": 6,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 6,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "OWL": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 3,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 7,
   "w": 3,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "CROW": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 5,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 14,
   "w": 6,
   "h": 5,
   "role": "shade"
  }
 ],
 "RAT": [
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 3,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 13,
   "w": 6,
   "h": 2,
   "role": "outline"
  }
 ],
 "GECKO": [
  {
   kind:"rect",
   "x": 10,
   "y": 6,
   "w": 4,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 4,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 8,
   "w": 4,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 4,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 14,
   "w": 4,
   "h": 3,
   "role": "shade"
  }
 ],
 "SEAHORSE": [
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 5,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 8,
   "w": 4,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 4,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 3,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "JELLYFISH": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 12,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 12,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 12,
   "w": 2,
   "h": 8,
   "role": "shade"
  }
 ],
 "WORM": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 6,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 9,
   "w": 5,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 11,
   "w": 5,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 14,
   "w": 5,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 6,
   "h": 3,
   "role": "body"
  }
 ],
 "SKULL": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 3,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 14,
   "w": 3,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "void"
  }
 ],
 "BONE": [
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 3,
   "w": 4,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 3,
   "w": 4,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 4,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 17,
   "w": 4,
   "h": 4,
   "role": "body"
  }
 ],
 "TOOTH": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 3,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 12,
   "w": 3,
   "h": 7,
   "role": "shade"
  }
 ],
 "FOSSIL": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "bright"
  }
 ],
 "SHELL": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 17,
   "w": 6,
   "h": 3,
   "role": "shade"
  }
 ],
 "FEATHER": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 18,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 3,
   "h": 9,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 7,
   "w": 3,
   "h": 9,
   "role": "bright"
  }
 ],
 "ANTLER": [
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 2,
   "h": 10,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 3,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 4,
   "w": 3,
   "h": 8,
   "role": "bright"
  }
 ],
 "VERTEBRA": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 4,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 9,
   "w": 4,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 9,
   "w": 4,
   "h": 4,
   "role": "void"
  }
 ],
 "CLAW": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 6,
   "h": 7,
   "role": "bright"
  }
 ],
 "EGG": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 15,
   "role": "bright"
  }
 ],
 "RIB": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 4,
   "h": 12,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 8,
   "h": 3,
   "role": "bright"
  }
 ],
 "JAW": [
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 8,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 10,
   "h": 2,
   "role": "bright"
  }
 ],
 "HORN": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "TUSK": [
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 6,
   "h": 10,
   "role": "bright"
  }
 ],
 "SCALE": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 7,
   "role": "bright"
  }
 ],
 "COCOON": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 6,
   "h": 10,
   "role": "bright"
  }
 ],
 "NEST": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "SHED_SKIN": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 8,
   "role": "void"
  }
 ],
 "CARAPACE": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 4,
   "role": "shade"
  }
 ],
 "FANG": [
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 4,
   "h": 8,
   "role": "bright"
  }
 ],
 "TALON": [
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 3,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 12,
   "w": 3,
   "h": 6,
   "role": "bright"
  }
 ],
 "BEAK": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 8,
   "h": 5,
   "role": "bright"
  }
 ],
 "SPINE": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 18,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 8,
   "h": 2,
   "role": "bright"
  }
 ],
 "MOLAR": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 4,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 11,
   "w": 3,
   "h": 7,
   "role": "shade"
  }
 ],
 "FOSSIL_LEAF": [
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 16,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 4,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 4,
   "h": 6,
   "role": "bright"
  }
 ],
 "APPLE": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 4,
   "w": 4,
   "h": 2,
   "role": "accent"
  }
 ],
 "PEAR": [
  {
   kind:"rect",
   "x": 9,
   "y": 6,
   "w": 6,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 4,
   "role": "shade"
  }
 ],
 "BANANA": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 4,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 9,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 11,
   "w": 4,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 2,
   "h": 4,
   "role": "bright"
  }
 ],
 "CHERRY": [
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 5,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 12,
   "w": 5,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 5,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 5,
   "h": 2,
   "role": "accent"
  }
 ],
 "STRAWBERRY": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 17,
   "w": 6,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "MUSHROOM": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 12,
   "w": 5,
   "h": 9,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 3,
   "h": 7,
   "role": "bright"
  }
 ],
 "CARROT": [
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 6,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 15,
   "w": 4,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 5,
   "role": "accent"
  }
 ],
 "PUMPKIN": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 5,
   "role": "shade"
  }
 ],
 "LEMON": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 2,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 10,
   "w": 2,
   "h": 4,
   "role": "body"
  }
 ],
 "ONION": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 4,
   "role": "accent"
  }
 ],
 "ORANGE": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "PEACH": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 7,
   "w": 2,
   "h": 11,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 4,
   "w": 4,
   "h": 2,
   "role": "accent"
  }
 ],
 "PLUM": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 4,
   "role": "shade"
  }
 ],
 "GRAPE": [
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 6,
   "h": 4,
   "role": "body"
  }
 ],
 "TOMATO": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 4,
   "role": "accent"
  }
 ],
 "POTATO": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "shade"
  }
 ],
 "CORN": [
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 6,
   "role": "accent"
  }
 ],
 "GARLIC": [
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 10,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 5,
   "role": "shade"
  }
 ],
 "PEPPER": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 5,
   "role": "accent"
  }
 ],
 "CUCUMBER": [
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 12,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 14,
   "h": 3,
   "role": "body"
  }
 ],
 "EGGPLANT": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 4,
   "role": "accent"
  }
 ],
 "RADISH": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 15,
   "w": 2,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 5,
   "role": "accent"
  }
 ],
 "TURNIP": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 15,
   "w": 2,
   "h": 4,
   "role": "body"
  }
 ],
 "BEET": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 16,
   "w": 2,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 5,
   "role": "accent"
  }
 ],
 "CABBAGE": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 13,
   "role": "shade"
  }
 ],
 "CAR": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 2,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 17,
   "w": 2,
   "h": 2,
   "role": "void"
  }
 ],
 "VAN": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 2,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 17,
   "w": 2,
   "h": 2,
   "role": "void"
  }
 ],
 "BUS": [
  {
   kind:"rect",
   "x": 3,
   "y": 7,
   "w": 18,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 3,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  }
 ],
 "TRUCK": [
  {
   kind:"rect",
   "x": 4,
   "y": 7,
   "w": 8,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 9,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  }
 ],
 "BICYCLE": [
  {
   kind:"rect",
   "x": 4,
   "y": 14,
   "w": 6,
   "h": 6,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 14,
   "w": 6,
   "h": 6,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 2,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 16,
   "w": 2,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 9,
   "h": 2,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 9,
   "w": 2,
   "h": 6,
   "role": "bright"
  }
 ],
 "MOTORCYCLE": [
  {
   kind:"rect",
   "x": 4,
   "y": 13,
   "w": 6,
   "h": 6,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 13,
   "w": 6,
   "h": 6,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 4,
   "h": 3,
   "role": "bright"
  }
 ],
 "TRAIN": [
  {
   kind:"rect",
   "x": 3,
   "y": 7,
   "w": 18,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 3,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 16,
   "w": 16,
   "h": 2,
   "role": "shade"
  }
 ],
 "BOAT": [
  {
   kind:"rect",
   "x": 4,
   "y": 13,
   "w": 16,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 9,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 5,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "TRACTOR": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 7,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 13,
   "w": 7,
   "h": 7,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 15,
   "w": 5,
   "h": 5,
   "role": "outline"
  }
 ],
 "SCOOTER": [
  {
   kind:"rect",
   "x": 4,
   "y": 15,
   "w": 5,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 15,
   "w": 5,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 10,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 7,
   "w": 2,
   "h": 9,
   "role": "shade"
  }
 ],
 "TAXI": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  }
 ],
 "AMBULANCE": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 11,
   "w": 4,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  }
 ],
 "FIRE_ENGINE": [
  {
   kind:"rect",
   "x": 3,
   "y": 8,
   "w": 18,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  }
 ],
 "TRAM": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 16,
   "w": 14,
   "h": 2,
   "role": "shade"
  }
 ],
 "SUBWAY_CAR": [
  {
   kind:"rect",
   "x": 3,
   "y": 8,
   "w": 18,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 3,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 16,
   "w": 14,
   "h": 2,
   "role": "shade"
  }
 ],
 "LOCOMOTIVE": [
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 16,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 4,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 6,
   "w": 5,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 16,
   "w": 14,
   "h": 3,
   "role": "outline"
  }
 ],
 "WAGON": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 14,
   "w": 5,
   "h": 5,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 14,
   "w": 5,
   "h": 5,
   "role": "outline"
  }
 ],
 "CART": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 8,
   "h": 6,
   "role": "outline"
  }
 ],
 "FORKLIFT": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 5,
   "w": 2,
   "h": 12,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 14,
   "w": 4,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  }
 ],
 "BULLDOZER": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 11,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 11,
   "w": 4,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 15,
   "w": 14,
   "h": 4,
   "role": "outline"
  }
 ],
 "EXCAVATOR": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 10,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 4,
   "w": 7,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 15,
   "w": 12,
   "h": 4,
   "role": "outline"
  }
 ],
 "SNOWPLOW": [
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 12,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 11,
   "w": 5,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 15,
   "w": 10,
   "h": 4,
   "role": "outline"
  }
 ],
 "ROWBOAT": [
  {
   kind:"rect",
   "x": 4,
   "y": 12,
   "w": 16,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 9,
   "w": 2,
   "h": 8,
   "role": "shade"
  }
 ],
 "SAILBOAT": [
  {
   kind:"rect",
   "x": 4,
   "y": 14,
   "w": 16,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 12,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 4,
   "w": 7,
   "h": 8,
   "role": "bright"
  }
 ],
 "DELIVERY_VAN": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "outline"
  }
 ],
 "TOASTER": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 3,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 6,
   "w": 3,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 19,
   "y": 10,
   "w": 2,
   "h": 5,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 19,
   "w": 3,
   "h": 2,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 19,
   "w": 3,
   "h": 2,
   "role": "outline"
  }
 ],
 "FAN": [
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 12,
   "w": 6,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 17,
   "w": 2,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 20,
   "w": 10,
   "h": 2,
   "role": "base"
  }
 ],
 "IRON": [
  {
   kind:"rect",
   "x": 5,
   "y": 12,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 14,
   "w": 3,
   "h": 3,
   "role": "bright"
  }
 ],
 "LAMP": [
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 19,
   "w": 10,
   "h": 2,
   "role": "base"
  }
 ],
 "VACUUM": [
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 18,
   "w": 12,
   "h": 3,
   "role": "base"
  }
 ],
 "BLENDER": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 8,
   "h": 7,
   "role": "shade"
  }
 ],
 "MICROWAVE": [
  {
   kind:"rect",
   "x": 4,
   "y": 7,
   "w": 16,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 9,
   "h": 6,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 9,
   "w": 2,
   "h": 6,
   "role": "accent"
  }
 ],
 "FRIDGE": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 12,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 6,
   "w": 1,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 13,
   "w": 1,
   "h": 4,
   "role": "accent"
  }
 ],
 "KETTLE_APPLIANCE": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 3,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 8,
   "w": 3,
   "h": 7,
   "role": "outline"
  }
 ],
 "HAIRDRYER": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 10,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 7,
   "w": 5,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 4,
   "h": 8,
   "role": "shade"
  }
 ],
 "MIXER": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 13,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 11,
   "w": 3,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 7,
   "h": 5,
   "role": "bright"
  }
 ],
 "COFFEE_MAKER": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 6,
   "role": "bright"
  }
 ],
 "WAFFLE_IRON": [
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 4,
   "role": "bright"
  }
 ],
 "RICE_COOKER": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "HEATER": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "screen"
  }
 ],
 "AIR_CONDITIONER": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 13,
   "w": 12,
   "h": 2,
   "role": "void"
  }
 ],
 "DISHWASHER": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 3,
   "role": "shade"
  }
 ],
 "WASHING_MACHINE": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 8,
   "role": "screen"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 11,
   "w": 4,
   "h": 4,
   "role": "void"
  }
 ],
 "DRYER": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 8,
   "role": "screen"
  }
 ],
 "HOTPLATE": [
  {
   kind:"rect",
   "x": 5,
   "y": 13,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 6,
   "role": "bright"
  }
 ],
 "DESK_FAN": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 2,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 19,
   "w": 10,
   "h": 2,
   "role": "base"
  }
 ],
 "SPACE_HEATER": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 8,
   "role": "screen"
  }
 ],
 "ELECTRIC_CLOCK": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 4,
   "role": "screen"
  }
 ],
 "FOOD_PROCESSOR": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 5,
   "role": "bright"
  }
 ],
 "HUMIDIFIER": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 5,
   "role": "bright"
  }
 ],
 "BOOK": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 5,
   "h": 11,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 7,
   "w": 5,
   "h": 11,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 2,
   "h": 15,
   "role": "outline"
  }
 ],
 "CANDLE": [
  {
   kind:"rect",
   "x": 10,
   "y": 7,
   "w": 4,
   "h": 13,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 19,
   "w": 6,
   "h": 2,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 2,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "BELL": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 14,
   "w": 14,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 18,
   "w": 4,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 3,
   "role": "shade"
  }
 ],
 "MASK": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 15,
   "w": 4,
   "h": 2,
   "role": "accent"
  }
 ],
 "STATUE": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 10,
   "h": 6,
   "role": "base"
  }
 ],
 "COIN": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "COMPASS": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "accent"
  }
 ],
 "MIRROR": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 6,
   "w": 6,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 14,
   "w": 2,
   "h": 6,
   "role": "shade"
  }
 ],
 "FRAME": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "void"
  }
 ],
 "UMBRELLA": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 15,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 17,
   "w": 3,
   "h": 3,
   "role": "shade"
  }
 ],
 "MEDAL": [
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 8,
   "h": 8,
   "role": "bright"
  }
 ],
 "SEAL": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 10,
   "h": 4,
   "role": "accent"
  }
 ],
 "SCROLL": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 2,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 17,
   "w": 14,
   "h": 2,
   "role": "shade"
  }
 ],
 "TABLET": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 10,
   "role": "inset"
  }
 ],
 "ICON": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 11,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "ROSARY_OBJECT": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 10,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 15,
   "w": 2,
   "h": 5,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 17,
   "w": 6,
   "h": 2,
   "role": "accent"
  }
 ],
 "LOCKET": [
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "BROOCH": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "RING_RELIC": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 10,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 6,
   "h": 6,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 4,
   "role": "accent"
  }
 ],
 "CROWN": [
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 3,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 6,
   "w": 4,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 7,
   "w": 3,
   "h": 5,
   "role": "bright"
  }
 ],
 "SCEPTER": [
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 14,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "BUST": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 6,
   "role": "base"
  }
 ],
 "PLAQUE": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 8,
   "role": "inset"
  }
 ],
 "MONOCLE": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 8,
   "h": 8,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 10,
   "w": 3,
   "h": 6,
   "role": "shade"
  }
 ],
 "POCKET_WATCH": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 4,
   "role": "shade"
  }
 ],
 "CHAIR": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 12,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 15,
   "w": 2,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 15,
   "w": 2,
   "h": 6,
   "role": "shade"
  }
 ],
 "STOOL": [
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 13,
   "w": 2,
   "h": 8,
   "role": "shade"
  }
 ],
 "TABLE": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 2,
   "h": 9,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 12,
   "w": 2,
   "h": 9,
   "role": "shade"
  }
 ],
 "DESK": [
  {
   kind:"rect",
   "x": 4,
   "y": 7,
   "w": 16,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 4,
   "h": 9,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 11,
   "w": 5,
   "h": 9,
   "role": "shade"
  }
 ],
 "CABINET": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 5,
   "h": 12,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 6,
   "w": 5,
   "h": 12,
   "role": "inset"
  }
 ],
 "DRAWER": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 3,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 10,
   "h": 3,
   "role": "inset"
  }
 ],
 "WARDROBE": [
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 14,
   "h": 17,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 2,
   "h": 14,
   "role": "void"
  }
 ],
 "SHELF": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 2,
   "role": "bright"
  }
 ],
 "BENCH": [
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 16,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 13,
   "w": 2,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 13,
   "w": 2,
   "h": 7,
   "role": "shade"
  }
 ],
 "BED": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 3,
   "h": 10,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 8,
   "w": 3,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 5,
   "h": 3,
   "role": "bright"
  }
 ],
 "NIGHTSTAND": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 3,
   "role": "inset"
  }
 ],
 "COUCH": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 16,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 11,
   "w": 12,
   "h": 3,
   "role": "bright"
  }
 ],
 "ARMCHAIR": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 4,
   "role": "bright"
  }
 ],
 "COAT_RACK": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 17,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 19,
   "w": 8,
   "h": 2,
   "role": "base"
  }
 ],
 "SCREEN_DIVIDER": [
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 5,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 5,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 5,
   "w": 5,
   "h": 14,
   "role": "body"
  }
 ],
 "CHEST": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 4,
   "role": "shade"
  }
 ],
 "TRUNK": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 14,
   "h": 2,
   "role": "shade"
  }
 ],
 "CRADLE": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 15,
   "w": 12,
   "h": 3,
   "role": "shade"
  }
 ],
 "ROCKING_CHAIR": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 17,
   "w": 14,
   "h": 3,
   "role": "shade"
  }
 ],
 "FOLDING_CHAIR": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 6,
   "role": "shade"
  }
 ],
 "SCHOOL_DESK": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 11,
   "w": 12,
   "h": 5,
   "role": "shade"
  }
 ],
 "PEDESTAL": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 18,
   "w": 14,
   "h": 3,
   "role": "base"
  }
 ],
 "LECTERN": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 4,
   "h": 10,
   "role": "shade"
  }
 ],
 "SIDEBOARD": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 12,
   "h": 5,
   "role": "inset"
  }
 ],
 "DRESSER": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 3,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 8,
   "h": 3,
   "role": "inset"
  }
 ],
 "HAT": [
  {
   kind:"rect",
   "x": 4,
   "y": 13,
   "w": 16,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 8,
   "role": "shade"
  }
 ],
 "BOOT": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 6,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 11,
   "h": 5,
   "role": "bright"
  }
 ],
 "SHOE": [
  {
   kind:"rect",
   "x": 5,
   "y": 12,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 2,
   "role": "shade"
  }
 ],
 "GLOVE": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 3,
   "h": 5,
   "role": "shade"
  }
 ],
 "SOCK": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 6,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 9,
   "h": 5,
   "role": "bright"
  }
 ],
 "SCARF": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 4,
   "h": 10,
   "role": "bright"
  }
 ],
 "COAT": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 2,
   "h": 14,
   "role": "void"
  }
 ],
 "JACKET": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 11,
   "role": "void"
  }
 ],
 "SHIRT": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 6,
   "w": 4,
   "h": 4,
   "role": "void"
  }
 ],
 "TROUSERS": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 9,
   "w": 2,
   "h": 10,
   "role": "void"
  }
 ],
 "DRESS": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 10,
   "role": "bright"
  }
 ],
 "APRON": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 3,
   "role": "void"
  }
 ],
 "BELT": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "TIE": [
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 6,
   "h": 12,
   "role": "bright"
  }
 ],
 "CAP": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 13,
   "w": 6,
   "h": 2,
   "role": "bright"
  }
 ],
 "SLIPPER": [
  {
   kind:"rect",
   "x": 5,
   "y": 13,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 4,
   "role": "bright"
  }
 ],
 "MITTEN": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 3,
   "h": 4,
   "role": "body"
  }
 ],
 "VEST": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 6,
   "w": 6,
   "h": 6,
   "role": "void"
  }
 ],
 "RAINCOAT": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 3,
   "w": 8,
   "h": 4,
   "role": "bright"
  }
 ],
 "UNIFORM": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 12,
   "role": "accent"
  }
 ],
 "SUSPENDER": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 2,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 4,
   "w": 2,
   "h": 16,
   "role": "body"
  }
 ],
 "COLLAR": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "void"
  }
 ],
 "SLEEVE": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 17,
   "w": 8,
   "h": 3,
   "role": "shade"
  }
 ],
 "POCKET": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 3,
   "role": "shade"
  }
 ],
 "BUTTON": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "PENCIL": [
  {
   kind:"rect",
   "x": 10,
   "y": 2,
   "w": 4,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 18,
   "w": 4,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 21,
   "w": 2,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 2,
   "role": "accent"
  }
 ],
 "PEN": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 18,
   "w": 4,
   "h": 4,
   "role": "bright"
  }
 ],
 "ERASER": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 6,
   "h": 8,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 8,
   "w": 6,
   "h": 8,
   "role": "bright"
  }
 ],
 "RULER": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "NOTEBOOK": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 5,
   "w": 3,
   "h": 14,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 7,
   "h": 10,
   "role": "bright"
  }
 ],
 "ENVELOPE": [
  {
   kind:"rect",
   "x": 4,
   "y": 7,
   "w": 16,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 7,
   "w": 16,
   "h": 4,
   "role": "shade"
  }
 ],
 "STAMP": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "inset"
  }
 ],
 "PAPERCLIP": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 14,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 7,
   "w": 4,
   "h": 10,
   "role": "void"
  }
 ],
 "BINDER": [
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 14,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 3,
   "h": 14,
   "role": "shade"
  }
 ],
 "FOLDER": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 6,
   "h": 3,
   "role": "bright"
  }
 ],
 "INK_BOTTLE": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 4,
   "role": "shade"
  }
 ],
 "CHALK": [
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 4,
   "role": "bright"
  }
 ],
 "MARKER": [
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 3,
   "w": 6,
   "h": 4,
   "role": "accent"
  }
 ],
 "CRAYON": [
  {
   kind:"rect",
   "x": 9,
   "y": 6,
   "w": 6,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 4,
   "role": "bright"
  }
 ],
 "SHARPENER": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "void"
  }
 ],
 "GLUE_STICK": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 3,
   "w": 8,
   "h": 3,
   "role": "bright"
  }
 ],
 "RUBBER_STAMP": [
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 8,
   "role": "shade"
  }
 ],
 "LABEL": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 4,
   "role": "bright"
  }
 ],
 "INDEX_CARD": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 10,
   "h": 1,
   "role": "accent"
  }
 ],
 "PUSHPIN": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 2,
   "h": 8,
   "role": "shade"
  }
 ],
 "CLIPBOARD": [
  {
   kind:"rect",
   "x": 5,
   "y": 4,
   "w": 14,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 3,
   "w": 8,
   "h": 3,
   "role": "shade"
  }
 ],
 "COMPASS_DRAWING": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 3,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 7,
   "w": 3,
   "h": 12,
   "role": "body"
  }
 ],
 "PROTRACTOR": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 3,
   "role": "void"
  }
 ],
 "SEALING_WAX": [
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "CARBON_PAPER": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 5,
   "w": 4,
   "h": 4,
   "role": "shade"
  }
 ],
 "TEDDY_BEAR": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 4,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 5,
   "w": 4,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "DOLL": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 12,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "BLOCK": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "bright"
  }
 ],
 "YOYO": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 11,
   "w": 12,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 5,
   "role": "outline"
  }
 ],
 "MARBLE": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "KITE": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 16,
   "h": 2,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 10,
   "role": "bright"
  }
 ],
 "BALL": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 2,
   "role": "accent"
  }
 ],
 "TOP": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 14,
   "w": 2,
   "h": 6,
   "role": "shade"
  }
 ],
 "PUZZLE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 4,
   "role": "bright"
  }
 ],
 "TIN_ROBOT": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 12,
   "w": 12,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 4,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "TOY_CAR": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 15,
   "w": 3,
   "h": 3,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 15,
   "w": 3,
   "h": 3,
   "role": "outline"
  }
 ],
 "JACK_IN_BOX": [
  {
   kind:"rect",
   "x": 6,
   "y": 11,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 8,
   "role": "bright"
  }
 ],
 "DOMINO": [
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 8,
   "h": 2,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 7,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 15,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "DICE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "CHESS_PIECE": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 11,
   "w": 4,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 17,
   "w": 12,
   "h": 4,
   "role": "base"
  }
 ],
 "RUBBER_DUCK": [
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 6,
   "w": 6,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 7,
   "w": 3,
   "h": 2,
   "role": "accent"
  }
 ],
 "TOY_BOAT": [
  {
   kind:"rect",
   "x": 5,
   "y": 12,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "WHISTLE": [
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 10,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 10,
   "w": 4,
   "h": 3,
   "role": "bright"
  }
 ],
 "SLINKY": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 14,
   "w": 10,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 10,
   "h": 3,
   "role": "body"
  }
 ],
 "SPINNING_TOP": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 15,
   "w": 2,
   "h": 5,
   "role": "shade"
  }
 ],
 "PUPPET": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 2,
   "w": 14,
   "h": 2,
   "role": "shade"
  }
 ],
 "MASK_TOY": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 10,
   "w": 3,
   "h": 3,
   "role": "void"
  }
 ],
 "MODEL_PLANE": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 18,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 3,
   "role": "bright"
  }
 ],
 "WOODEN_HORSE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 16,
   "w": 14,
   "h": 3,
   "role": "shade"
  }
 ],
 "JUMP_ROPE": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 3,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 5,
   "w": 3,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 10,
   "h": 10,
   "role": "outline"
  }
 ],
 "GUITAR": [
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 6,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 16,
   "w": 4,
   "h": 2,
   "role": "accent"
  }
 ],
 "VIOLIN": [
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 7,
   "role": "shade"
  }
 ],
 "TRUMPET": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 14,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 7,
   "w": 4,
   "h": 9,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 6,
   "h": 3,
   "role": "shade"
  }
 ],
 "DRUM": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 3,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 16,
   "w": 14,
   "h": 3,
   "role": "bright"
  }
 ],
 "FLUTE": [
  {
   kind:"rect",
   "x": 4,
   "y": 11,
   "w": 16,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "HARMONICA": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 2,
   "role": "void"
  }
 ],
 "TAMBOURINE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "BANJO": [
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 9,
   "role": "shade"
  }
 ],
 "MANDOLIN": [
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 9,
   "role": "shade"
  }
 ],
 "UKULELE": [
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 8,
   "role": "shade"
  }
 ],
 "CLARINET": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 18,
   "w": 4,
   "h": 3,
   "role": "bright"
  }
 ],
 "SAXOPHONE": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 4,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 6,
   "h": 5,
   "role": "bright"
  }
 ],
 "TROMBONE": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 12,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 7,
   "w": 5,
   "h": 8,
   "role": "bright"
  }
 ],
 "CYMBAL": [
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 14,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "shade"
  }
 ],
 "TRIANGLE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "void"
  }
 ],
 "BELL_INSTRUMENT": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 15,
   "w": 2,
   "h": 5,
   "role": "shade"
  }
 ],
 "OCARINA": [
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "bright"
  }
 ],
 "RECORDER": [
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "METRONOME": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 9,
   "role": "shade"
  }
 ],
 "TUNING_FORK": [
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 2,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 4,
   "w": 2,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 11,
   "w": 6,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 2,
   "h": 7,
   "role": "shade"
  }
 ],
 "MUSIC_BOX": [
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 2,
   "h": 5,
   "role": "bright"
  }
 ],
 "KALIMBA": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 4,
   "role": "bright"
  }
 ],
 "CONCERTINA": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 6,
   "h": 10,
   "role": "shade"
  }
 ],
 "BUGLE": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 12,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 7,
   "w": 4,
   "h": 9,
   "role": "bright"
  }
 ],
 "MARACA": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 2,
   "h": 7,
   "role": "shade"
  }
 ],
 "BREAD": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 2,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 8,
   "w": 2,
   "h": 5,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 8,
   "w": 2,
   "h": 5,
   "role": "shade"
  }
 ],
 "CHEESE": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 11,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "CAKE": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 14,
   "w": 14,
   "h": 2,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "COOKIE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 10,
   "w": 1,
   "h": 1,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "shade"
  }
 ],
 "DONUT": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 3,
   "role": "accent"
  }
 ],
 "SANDWICH": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 12,
   "w": 14,
   "h": 2,
   "role": "bright"
  }
 ],
 "PIE": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 2,
   "role": "shade"
  }
 ],
 "PRETZEL": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "void"
  }
 ],
 "WAFFLE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 8,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 13,
   "w": 3,
   "h": 3,
   "role": "void"
  }
 ],
 "PANCAKE": [
  {
   kind:"rect",
   "x": 5,
   "y": 13,
   "w": 14,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 12,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 6,
   "w": 4,
   "h": 2,
   "role": "accent"
  }
 ],
 "HOTDOG": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 3,
   "y": 11,
   "w": 18,
   "h": 3,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 11,
   "w": 12,
   "h": 1,
   "role": "bright"
  }
 ],
 "BURGER": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 2,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 12,
   "w": 14,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 14,
   "w": 12,
   "h": 4,
   "role": "body"
  }
 ],
 "PIZZA_SLICE": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 16,
   "w": 4,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "CROISSANT": [
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 11,
   "w": 4,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 11,
   "w": 4,
   "h": 4,
   "role": "bright"
  }
 ],
 "BAGEL": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "void"
  }
 ],
 "CRACKER": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "CANDY": [
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 4,
   "h": 8,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 8,
   "w": 4,
   "h": 8,
   "role": "accent"
  }
 ],
 "CHOCOLATE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 11,
   "w": 12,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 1,
   "h": 12,
   "role": "void"
  }
 ],
 "ICE_CREAM": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 18,
   "w": 4,
   "h": 3,
   "role": "shade"
  }
 ],
 "CUPCAKE": [
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "MUFFIN": [
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 7,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 6,
   "role": "bright"
  }
 ],
 "SAUSAGE": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 3,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 12,
   "w": 3,
   "h": 3,
   "role": "shade"
  }
 ],
 "TOAST": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "NOODLES": [
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 14,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 14,
   "h": 2,
   "role": "shade"
  }
 ],
 "CEREAL_BOX": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "bright"
  }
 ],
 "DOOR": [
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 17,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 5,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 13,
   "w": 8,
   "h": 6,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "WINDOW": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 4,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 7,
   "w": 4,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 4,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 13,
   "w": 4,
   "h": 4,
   "role": "bright"
  }
 ],
 "BRICK": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "TILE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "inset"
  }
 ],
 "HINGE": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 4,
   "w": 2,
   "h": 16,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 8,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 15,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "DOORKNOB": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "LATCH": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 2,
   "role": "bright"
  }
 ],
 "MAILBOX": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 15,
   "w": 2,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 8,
   "w": 2,
   "h": 4,
   "role": "accent"
  }
 ],
 "VENT": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 10,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 13,
   "w": 10,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 15,
   "w": 10,
   "h": 1,
   "role": "void"
  }
 ],
 "GRATE": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "void"
  }
 ],
 "PIPE": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 3,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 8,
   "w": 3,
   "h": 8,
   "role": "shade"
  }
 ],
 "FAUCET": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 4,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "DRAIN": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "LIGHT_SWITCH": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "bright"
  }
 ],
 "OUTLET": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 14,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "STAIR": [
  {
   kind:"rect",
   "x": 5,
   "y": 15,
   "w": 14,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 11,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 7,
   "w": 7,
   "h": 4,
   "role": "body"
  }
 ],
 "RAILING": [
  {
   kind:"rect",
   "x": 4,
   "y": 6,
   "w": 16,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 16,
   "w": 16,
   "h": 2,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 16,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "shade"
  }
 ],
 "GATE": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 2,
   "h": 9,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 9,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 8,
   "w": 2,
   "h": 9,
   "role": "void"
  }
 ],
 "FENCE_POST": [
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 17,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 3,
   "role": "bright"
  }
 ],
 "ROOF_TILE": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 12,
   "h": 2,
   "role": "shade"
  }
 ],
 "CHIMNEY": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 3,
   "role": "bright"
  }
 ],
 "SIGN": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 14,
   "w": 2,
   "h": 7,
   "role": "shade"
  }
 ],
 "HOUSE_NUMBER": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 6,
   "role": "bright"
  }
 ],
 "KEYHOLE": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 9,
   "w": 4,
   "h": 4,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 13,
   "w": 2,
   "h": 3,
   "role": "void"
  }
 ],
 "PEEPHOLE": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "TEST_TUBE": [
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 3,
   "w": 8,
   "h": 2,
   "role": "rim"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 11,
   "w": 4,
   "h": 7,
   "role": "bright"
  }
 ],
 "BEAKER": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 5,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 7,
   "role": "bright"
  }
 ],
 "PETRI_DISH": [
  {
   kind:"rect",
   "x": 5,
   "y": 10,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 13,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "MICROSCOPE": [
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 13,
   "w": 4,
   "h": 6,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 18,
   "w": 12,
   "h": 3,
   "role": "base"
  }
 ],
 "BUNSEN_BURNER": [
  {
   kind:"rect",
   "x": 10,
   "y": 8,
   "w": 4,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 10,
   "h": 3,
   "role": "base"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 5,
   "role": "bright"
  }
 ],
 "PIPETTE": [
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 3,
   "w": 4,
   "h": 4,
   "role": "accent"
  }
 ],
 "VIAL": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 11,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "CENTRIFUGE_TUBE": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 15,
   "w": 6,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 18,
   "w": 4,
   "h": 2,
   "role": "body"
  }
 ],
 "THERMOMETER": [
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 4,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 16,
   "w": 6,
   "h": 5,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 8,
   "role": "accent"
  }
 ],
 "SCALE_LAB": [
  {
   kind:"rect",
   "x": 11,
   "y": 5,
   "w": 2,
   "h": 13,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 4,
   "h": 2,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 8,
   "w": 4,
   "h": 2,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 18,
   "w": 10,
   "h": 2,
   "role": "base"
  }
 ],
 "GOGGLES": [
  {
   kind:"rect",
   "x": 4,
   "y": 9,
   "w": 16,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 5,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 10,
   "w": 5,
   "h": 4,
   "role": "bright"
  }
 ],
 "SPECIMEN_JAR": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 4,
   "w": 8,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "accent"
  }
 ],
 "SLIDE": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "accent"
  }
 ],
 "MAGNIFIER": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 14,
   "w": 6,
   "h": 6,
   "role": "shade"
  }
 ],
 "CLAMP_LAB": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 4,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 13,
   "role": "shade"
  }
 ],
 "FUNNEL": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 11,
   "w": 4,
   "h": 8,
   "role": "body"
  }
 ],
 "MORTAR": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 5,
   "w": 3,
   "h": 8,
   "role": "shade"
  }
 ],
 "PESTLE": [
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 15,
   "w": 8,
   "h": 4,
   "role": "body"
  }
 ],
 "REAGENT_BOTTLE": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 6,
   "h": 5,
   "role": "bright"
  }
 ],
 "TONGS": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 3,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 4,
   "w": 3,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 3,
   "role": "body"
  }
 ],
 "TRIPOD": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 3,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 9,
   "w": 3,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 9,
   "w": 3,
   "h": 11,
   "role": "body"
  }
 ],
 "GAUGE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 8,
   "w": 2,
   "h": 5,
   "role": "accent"
  }
 ],
 "SYRINGE_OBJECT": [
  {
   kind:"rect",
   "x": 10,
   "y": 6,
   "w": 4,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 2,
   "w": 2,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 17,
   "w": 2,
   "h": 5,
   "role": "body"
  }
 ],
 "PH_STRIP": [
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 4,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 12,
   "w": 6,
   "h": 4,
   "role": "shade"
  }
 ],
 "LAB_TIMER": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "bright"
  }
 ],
 "BRIEFCASE": [
  {
   kind:"rect",
   "x": 4,
   "y": 8,
   "w": 16,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 5,
   "w": 6,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 2,
   "h": 2,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 12,
   "w": 2,
   "h": 2,
   "role": "bright"
  }
 ],
 "PHONE_DESK": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 6,
   "role": "inset"
  }
 ],
 "DESK_LAMP": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 9,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 17,
   "w": 10,
   "h": 2,
   "role": "base"
  }
 ],
 "FILE_BOX": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 11,
   "w": 4,
   "h": 2,
   "role": "void"
  }
 ],
 "NAMEPLATE": [
  {
   kind:"rect",
   "x": 5,
   "y": 11,
   "w": 14,
   "h": 5,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 12,
   "w": 10,
   "h": 3,
   "role": "bright"
  }
 ],
 "BADGE": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 4,
   "role": "bright"
  }
 ],
 "ID_CARD": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 4,
   "h": 5,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 9,
   "w": 5,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 12,
   "y": 11,
   "w": 5,
   "h": 1,
   "role": "accent"
  }
 ],
 "CALENDAR": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 10,
   "h": 6,
   "role": "bright"
  }
 ],
 "PUNCH": [
  {
   kind:"rect",
   "x": 6,
   "y": 10,
   "w": 12,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 5,
   "role": "shade"
  }
 ],
 "RECEIPT": [
  {
   kind:"rect",
   "x": 7,
   "y": 4,
   "w": 10,
   "h": 16,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 7,
   "w": 6,
   "h": 1,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 1,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 11,
   "w": 6,
   "h": 1,
   "role": "shade"
  }
 ],
 "LEDGER": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 15,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 3,
   "h": 15,
   "role": "shade"
  }
 ],
 "IN_TRAY": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 4,
   "role": "bright"
  }
 ],
 "OUT_TRAY": [
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 16,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 5,
   "role": "bright"
  }
 ],
 "ROLODEX": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 4,
   "y": 10,
   "w": 2,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 18,
   "y": 10,
   "w": 2,
   "h": 4,
   "role": "shade"
  }
 ],
 "TICKET": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 14,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 9,
   "w": 1,
   "h": 6,
   "role": "void"
  }
 ],
 "TOKEN": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 10,
   "w": 4,
   "h": 4,
   "role": "void"
  }
 ],
 "KEYCARD": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 3,
   "h": 3,
   "role": "bright"
  }
 ],
 "CASH_BOX": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 2,
   "h": 3,
   "role": "bright"
  }
 ],
 "RUBBER_BAND": [
  {
   kind:"rect",
   "x": 6,
   "y": 8,
   "w": 12,
   "h": 8,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 10,
   "w": 8,
   "h": 4,
   "role": "void"
  }
 ],
 "MEMO_PAD": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 14,
   "w": 4,
   "h": 4,
   "role": "shade"
  }
 ],
 "PAPERWEIGHT": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  }
 ],
 "DATE_STAMP": [
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 8,
   "h": 6,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 5,
   "w": 4,
   "h": 7,
   "role": "shade"
  }
 ],
 "ADDING_MACHINE": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 8,
   "w": 10,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 8,
   "w": 2,
   "h": 6,
   "role": "shade"
  }
 ],
 "INTEROFFICE_ENVELOPE": [
  {
   kind:"rect",
   "x": 5,
   "y": 6,
   "w": 14,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 9,
   "w": 4,
   "h": 4,
   "role": "void"
  }
 ],
 "VISITOR_PASS": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 9,
   "w": 10,
   "h": 3,
   "role": "accent"
  }
 ],
 "EYE_OBJECT": [
  {
   kind:"rect",
   "x": 5,
   "y": 8,
   "w": 14,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 10,
   "w": 2,
   "h": 4,
   "role": "void"
  }
 ],
 "HAND_MODEL": [
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 8,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 2,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 2,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 4,
   "w": 2,
   "h": 8,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 6,
   "w": 2,
   "h": 6,
   "role": "body"
  }
 ],
 "MANNEQUIN_HEAD": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 14,
   "w": 4,
   "h": 6,
   "role": "shade"
  }
 ],
 "FALSE_TEETH": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 4,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 10,
   "w": 10,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 13,
   "w": 12,
   "h": 4,
   "role": "shade"
  }
 ],
 "GLASS_EYE": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 1,
   "h": 1,
   "role": "void"
  }
 ],
 "WIG": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 4,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 15,
   "y": 9,
   "w": 4,
   "h": 7,
   "role": "body"
  }
 ],
 "PROSTHETIC_HAND": [
  {
   kind:"rect",
   "x": 8,
   "y": 11,
   "w": 8,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 2,
   "h": 7,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 4,
   "w": 2,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 4,
   "w": 2,
   "h": 8,
   "role": "bright"
  }
 ],
 "DENTAL_CAST": [
  {
   kind:"rect",
   "x": 6,
   "y": 7,
   "w": 12,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 4,
   "role": "bright"
  }
 ],
 "MINIATURE_DOOR": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 8,
   "w": 6,
   "h": 5,
   "role": "inset"
  },
  {
   kind:"rect",
   "x": 14,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "EMPTY_FRAME": [
  {
   kind:"rect",
   "x": 5,
   "y": 5,
   "w": 14,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 8,
   "role": "void"
  }
 ],
 "SEALED_BOX": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 11,
   "w": 12,
   "h": 2,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 2,
   "h": 12,
   "role": "accent"
  }
 ],
 "NUMBERED_TAG": [
  {
   kind:"rect",
   "x": 7,
   "y": 5,
   "w": 10,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 10,
   "w": 6,
   "h": 4,
   "role": "bright"
  }
 ],
 "UNKNOWN_SWITCH": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 6,
   "role": "bright"
  }
 ],
 "RED_STRING": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "outline"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 17,
   "y": 6,
   "w": 1,
   "h": 1,
   "role": "accent"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 17,
   "w": 1,
   "h": 1,
   "role": "accent"
  }
 ],
 "BLACK_CUBE": [
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 12,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 6,
   "w": 12,
   "h": 3,
   "role": "bright"
  }
 ],
 "WHITE_SPHERE": [
  {
   kind:"rect",
   "x": 7,
   "y": 7,
   "w": 10,
   "h": 10,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 6,
   "role": "accent"
  }
 ],
 "TINY_CHAIR": [
  {
   kind:"rect",
   "x": 8,
   "y": 8,
   "w": 8,
   "h": 9,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 12,
   "w": 8,
   "h": 2,
   "role": "bright"
  }
 ],
 "MODEL_HOUSE": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 11,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 6,
   "y": 4,
   "w": 12,
   "h": 4,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 11,
   "w": 4,
   "h": 6,
   "role": "void"
  }
 ],
 "BOTTLED_SHADOW": [
  {
   kind:"rect",
   "x": 8,
   "y": 6,
   "w": 8,
   "h": 12,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 4,
   "w": 6,
   "h": 3,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 9,
   "y": 9,
   "w": 6,
   "h": 7,
   "role": "void"
  }
 ],
 "UNLABELED_TAPE": [
  {
   kind:"rect",
   "x": 5,
   "y": 7,
   "w": 14,
   "h": 10,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 4,
   "role": "void"
  }
 ],
 "BLANK_KEY": [
  {
   kind:"rect",
   "x": 5,
   "y": 9,
   "w": 7,
   "h": 7,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 7,
   "y": 11,
   "w": 3,
   "h": 3,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 11,
   "w": 9,
   "h": 3,
   "role": "body"
  }
 ],
 "FALSE_WINDOW": [
  {
   kind:"rect",
   "x": 6,
   "y": 5,
   "w": 12,
   "h": 14,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 7,
   "w": 8,
   "h": 10,
   "role": "void"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 9,
   "w": 1,
   "h": 1,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 13,
   "y": 12,
   "w": 1,
   "h": 1,
   "role": "bright"
  }
 ],
 "STONE_EGG": [
  {
   kind:"rect",
   "x": 7,
   "y": 6,
   "w": 10,
   "h": 13,
   "role": "body"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 9,
   "w": 8,
   "h": 3,
   "role": "shade"
  }
 ],
 "METAL_FLOWER": [
  {
   kind:"rect",
   "x": 8,
   "y": 5,
   "w": 8,
   "h": 8,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 11,
   "y": 12,
   "w": 2,
   "h": 8,
   "role": "shade"
  },
  {
   kind:"rect",
   "x": 8,
   "y": 14,
   "w": 4,
   "h": 2,
   "role": "bright"
  }
 ],
 "CLOCK_HAND": [
  {
   kind:"rect",
   "x": 11,
   "y": 3,
   "w": 2,
   "h": 14,
   "role": "bright"
  },
  {
   kind:"rect",
   "x": 10,
   "y": 16,
   "w": 4,
   "h": 4,
   "role": "shade"
  }
 ]
};

export function morphology(object, fallback){
  if(exact[object]) return exact[object];
  const v=fallback.variant||0, out=[...fallback.primitives];
  if(v%3===0) out.push(R(4+(v%5),3,2,3,"accent"));
  if(v%3===1) out.push(R(17,7+(v%6),2,4,"bright"));
  if(v%3===2) out.push(R(7+(v%7),18,4,2,"shade"));
  if(v%2===0) out.push(P(8+(v%9),8+(v%5),"accent"));
  return out;
}
export const MORPHOLOGY_COUNT=Object.keys(exact).length;
