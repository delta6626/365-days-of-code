# Barcode Generator (Code128)

This is a Python command-line tool to generate Code128 barcodes from user input. The barcode is saved as an image using the Pillow library.

## Features

- Supports all printable ASCII characters via Code128-B encoding
- Outputs a barcode image (PNG format)
- Customizable bar width and height
- Graceful handling of invalid input

## Requirements

- Python 3.9 or higher
- Pillow library
- Poetry (optional, for dependency management)

## Installation

You can install dependencies using Poetry (recommended):

Run `poetry install` in your project directory.

Alternatively, you can manually install Pillow using pip:

`pip install pillow`

## Usage

Run the script using Poetry:

`poetry run python barcode.py`

Or directly with Python:

`python barcode.py`

The program will prompt you to enter:

- The text you want to encode
- Bar width (optional)
- Bar height (optional)

If you leave bar width or height empty or enter invalid values, default sizes will be used.

The generated barcode image will be saved in your current directory as `barcode.png`.

## Example

When you run the program, an example interaction might look like:

```
Enter text to encode: Hello123
Enter bar width: 4
Enter bar height: 50
Saved barcode as barcode.png
```

## Contributing

Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License.
