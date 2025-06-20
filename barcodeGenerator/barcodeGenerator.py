# A Python program to create a barcode from command line input.
# Author: https://github.com/delta6626

from PIL import Image, ImageDraw

CODE128_PATTERNS = [
    [2, 1, 2, 2, 2, 2],  # 0
    [2, 2, 2, 1, 2, 2],  # 1
    [2, 2, 2, 2, 2, 1],  # 2
    [1, 2, 1, 2, 2, 3],  # 3
    [1, 2, 1, 3, 2, 2],  # 4
    [1, 3, 1, 2, 2, 2],  # 5
    [1, 2, 2, 2, 1, 3],  # 6
    [1, 2, 2, 3, 1, 2],  # 7
    [1, 3, 2, 2, 1, 2],  # 8
    [2, 2, 1, 2, 1, 3],  # 9
    [2, 2, 1, 3, 1, 2],  # 10
    [2, 3, 1, 2, 1, 2],  # 11
    [1, 1, 2, 2, 3, 2],  # 12
    [1, 2, 2, 1, 3, 2],  # 13
    [1, 2, 2, 2, 3, 1],  # 14
    [1, 1, 3, 2, 2, 2],  # 15
    [1, 2, 3, 1, 2, 2],  # 16
    [1, 2, 3, 2, 2, 1],  # 17
    [2, 2, 3, 2, 1, 1],  # 18
    [2, 2, 1, 1, 3, 2],  # 19
    [2, 2, 1, 2, 3, 1],  # 20
    [2, 1, 3, 2, 1, 2],  # 21
    [2, 2, 3, 1, 1, 2],  # 22
    [3, 1, 2, 1, 3, 1],  # 23
    [3, 1, 1, 2, 2, 2],  # 24
    [3, 2, 1, 1, 2, 2],  # 25
    [3, 2, 1, 2, 2, 1],  # 26
    [3, 1, 2, 2, 1, 2],  # 27
    [3, 2, 2, 1, 1, 2],  # 28
    [3, 2, 2, 2, 1, 1],  # 29
    [2, 1, 2, 1, 2, 3],  # 30
    [2, 1, 2, 3, 2, 1],  # 31
    [2, 3, 2, 1, 2, 1],  # 32
    [1, 1, 1, 3, 2, 3],  # 33
    [1, 3, 1, 1, 2, 3],  # 34
    [1, 3, 1, 3, 2, 1],  # 35
    [1, 1, 2, 3, 1, 3],  # 36
    [1, 3, 2, 1, 1, 3],  # 37
    [1, 3, 2, 3, 1, 1],  # 38
    [2, 1, 1, 3, 1, 3],  # 39
    [2, 3, 1, 1, 1, 3],  # 40
    [2, 3, 1, 3, 1, 1],  # 41
    [1, 1, 2, 1, 3, 3],  # 42
    [1, 1, 2, 3, 3, 1],  # 43
    [1, 3, 2, 1, 3, 1],  # 44
    [1, 1, 3, 1, 2, 3],  # 45
    [1, 1, 3, 3, 2, 1],  # 46
    [1, 3, 3, 1, 2, 1],  # 47
    [3, 1, 3, 1, 2, 1],  # 48
    [2, 1, 1, 3, 3, 1],  # 49
    [2, 3, 1, 1, 3, 1],  # 50
    [2, 1, 3, 1, 1, 3],  # 51
    [2, 1, 3, 3, 1, 1],  # 52
    [2, 1, 3, 1, 3, 1],  # 53
    [3, 1, 1, 1, 2, 3],  # 54
    [3, 1, 1, 3, 2, 1],  # 55
    [3, 3, 1, 1, 2, 1],  # 56
    [3, 1, 2, 1, 1, 3],  # 57
    [3, 1, 2, 3, 1, 1],  # 58
    [3, 3, 2, 1, 1, 1],  # 59
    [3, 1, 4, 1, 1, 1],  # 60
    [2, 2, 1, 4, 1, 1],  # 61
    [4, 3, 1, 1, 1, 1],  # 62
    [1, 1, 1, 2, 2, 4],  # 63
    [1, 1, 1, 4, 2, 2],  # 64
    [1, 2, 1, 1, 2, 4],  # 65
    [1, 2, 1, 4, 2, 1],  # 66
    [1, 4, 1, 1, 2, 2],  # 67
    [1, 4, 1, 2, 2, 1],  # 68
    [1, 1, 2, 2, 1, 4],  # 69
    [1, 1, 2, 4, 1, 2],  # 70
    [1, 2, 2, 1, 1, 4],  # 71
    [1, 2, 2, 4, 1, 1],  # 72
    [1, 4, 2, 1, 1, 2],  # 73
    [1, 4, 2, 2, 1, 1],  # 74
    [2, 4, 1, 2, 1, 1],  # 75
    [2, 2, 1, 1, 1, 4],  # 76
    [4, 1, 3, 1, 1, 1],  # 77
    [2, 4, 1, 1, 1, 2],  # 78
    [1, 3, 4, 1, 1, 1],  # 79
    [1, 1, 1, 2, 4, 2],  # 80
    [1, 2, 1, 1, 4, 2],  # 81
    [1, 2, 1, 2, 4, 1],  # 82
    [1, 1, 4, 2, 1, 2],  # 83
    [1, 2, 4, 1, 1, 2],  # 84
    [1, 2, 4, 2, 1, 1],  # 85
    [4, 1, 1, 2, 1, 2],  # 86
    [4, 2, 1, 1, 1, 2],  # 87
    [4, 2, 1, 2, 1, 1],  # 88
    [2, 1, 2, 1, 4, 1],  # 89
    [2, 1, 4, 1, 2, 1],  # 90
    [4, 1, 2, 1, 2, 1],  # 91
    [1, 1, 1, 1, 4, 3],  # 92
    [1, 1, 1, 3, 4, 1],  # 93
    [1, 3, 1, 1, 4, 1],  # 94
    [1, 1, 4, 1, 1, 3],  # 95
    [1, 1, 4, 3, 1, 1],  # 96
    [4, 1, 1, 1, 1, 3],  # 97
    [4, 1, 1, 3, 1, 1],  # 98
    [1, 1, 3, 1, 4, 1],  # 99
    [1, 1, 4, 1, 3, 1],  # 100
    [3, 1, 1, 1, 4, 1],  # 101
    [4, 1, 1, 1, 3, 1],  # 102
    [2, 1, 1, 4, 1, 2],  # 103 Start A
    [2, 1, 1, 2, 1, 4],  # 104 Start B (Supports all printable ASCII characters)
    [2, 1, 1, 2, 3, 2],  # 105 Start C
    [2, 3, 3, 1, 1, 1, 2],  # 106 STOP (7 elements)
]

CODE128_CHAR_TO_CODEB = {
    ' ': 0, '!': 1, '"': 2, '#': 3, '$': 4, '%': 5, '&': 6, "'": 7,
    '(': 8, ')': 9, '*': 10, '+': 11, ',': 12, '-': 13, '.': 14, '/': 15,
    '0': 16, '1': 17, '2': 18, '3': 19, '4': 20, '5': 21, '6': 22, '7': 23,
    '8': 24, '9': 25, ':': 26, ';': 27, '<': 28, '=': 29, '>': 30, '?': 31,
    '@': 32, 'A': 33, 'B': 34, 'C': 35, 'D': 36, 'E': 37, 'F': 38, 'G': 39,
    'H': 40, 'I': 41, 'J': 42, 'K': 43, 'L': 44, 'M': 45, 'N': 46, 'O': 47,
    'P': 48, 'Q': 49, 'R': 50, 'S': 51, 'T': 52, 'U': 53, 'V': 54, 'W': 55,
    'X': 56, 'Y': 57, 'Z': 58, '[': 59, '\\': 60, ']': 61, '^': 62, '_': 63,
    '`': 64, 'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71,
    'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79,
    'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84, 'u': 85, 'v': 86, 'w': 87,
    'x': 88, 'y': 89, 'z': 90, '{': 91, '|': 92, '}': 93, '~': 94, 'DEL': 95
}


def drawBarCode(barCodeArray, standardBarWidth, barHeight):
    
    imageWidth = 0;
    for pattern in barCodeArray:
        imageWidth += sum(pattern)*standardBarWidth;

    image = Image.new("RGB", (imageWidth, barHeight), "white")
    imageDraw = ImageDraw.Draw(image)

    x = 0

    for pattern in barCodeArray:
        black = True
        for code in pattern:
            if black:
                imageDraw.rectangle([x,0, x + code*standardBarWidth - 1, barHeight], fill="black")
            black = not black
            x += code*standardBarWidth

    image.save("barcode.png")


def generateBarCodeArray(textInput, standardBarWidth, barHeight):

    barCodeArray = [CODE128_PATTERNS[104]]  # Start Code B
    for char in textInput:
        barCodeArray.append(CODE128_PATTERNS[CODE128_CHAR_TO_CODEB[char]])

    checkSum = 104
    for i in range(len(textInput)):
        checkSum += (i + 1) * CODE128_CHAR_TO_CODEB[textInput[i]]

    checkSum = checkSum % 103

    barCodeArray.append(CODE128_PATTERNS[checkSum])  # Checksum pattern
    barCodeArray.append(CODE128_PATTERNS[106])      # Stop pattern

    drawBarCode(barCodeArray, standardBarWidth, barHeight)
    
def getUserInput():
    try:
        textInput = input("Enter yout text: ")
        standardBarWidth = int(input("Enter the standard bar width: "))
        barHeight = int(input("Enter bar height: "))
        generateBarCodeArray(textInput, standardBarWidth, barHeight);
    except Exception:
        print("An error occured. Try again.")

if __name__ == "__main__":
    getUserInput()