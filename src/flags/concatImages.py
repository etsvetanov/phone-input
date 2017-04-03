import os
from PIL import Image

IMAGES_PATH = 'FlagKit/Images'
IMAGES_EXTENSION = "png"
IMAGES_SUFFIX = "@2x"
IMAGE_TARGET_PATH = '.'
IMAGE_TARGET_NAME = 'flags.png'
CSS_TARGET_PATH = '.'
CSS_TARGET_NAME = 'flags.css'
NEW_HEIGHT = 28  # px
RESIZE = True


def get_file_names():
    return [os.path.join(cwd, IMAGES_PATH, file_name)
            for file_name
            in os.listdir(IMAGES_PATH)
            if IMAGES_SUFFIX in file_name]


def get_images(f_names):
    return map(Image.open, f_names)


def get_image_sizes(images):
    widths, heights = zip(*(i.size for i in images))
    total_width = sum(widths)
    max_height = max(heights)
    max_width = max(widths)

    return total_width, max_height, max_width


def create_new_image(images, width, height):
    new_image = Image.new('RGB', (width, height))
    x_offset = 0

    for image in images:
        new_image.paste(image, (x_offset, 0))
        x_offset += image.size[0]

    new_image.save(os.path.join(IMAGE_TARGET_PATH, IMAGE_TARGET_NAME))


def generate_css_class(iso_code, x):
    return '.phone-input-container .{iso} {{ background_position: {x}px 0; }}\n'.format(iso=iso_code, x=x)


def position_generator(start, step):
    current = start
    while True:
        yield current
        start += step


def generate_css(iso_codes, width):
    """iso_codes must be ordered the same way images are ordered"""

    return ''.join(map(generate_css_class, iso_codes, position_generator(0, -width)))


def get_iso_codes(file_names, separator="."):
    return map(lambda file_name: file_name.split(separator)[0], file_names)


def write_to_file(filepath, filename, content):
    with open(os.path.join(filepath, filename), 'w') as f:
        f.write(content)


if __name__ == '__main__':
    cwd = os.getcwd()
    file_names = get_file_names()
    get_imgs = lambda : get_images(file_names)

    images_iter = get_imgs()
    new_width, new_height, single_image_width = get_image_sizes(images_iter)

    create_new_image(get_imgs(), new_width, new_height)

    iso_codes = get_iso_codes(file_names, "@2x.")

    css_code = generate_css(iso_codes, single_image_width)
    write_to_file(CSS_TARGET_PATH, CSS_TARGET_NAME, css_code)
