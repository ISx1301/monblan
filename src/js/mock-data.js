import image1 from '../assets/images/image1.png'
import image2 from '../assets/images/image2.png'

export const cards = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  rowsImage: image1,
  colsImage: image2,
  imageAlt: 'Uploaded image',
  primaryDate: 'Today',
  primaryLikes: 128,
  primaryComments: 31,
  secondaryDate: '9-08-2016',
  secondaryLikes: 67,
  secondaryComments: 22,
  uploadLabel: 'Image upload',
  uploadDate: '11-04-2016',
}))
