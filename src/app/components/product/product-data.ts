import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Product} from '../../models/product';
import {User} from '../../models/user';


export class ProductData implements InMemoryDbService {

  createDb() {
    const products: Product[] = [
      /*{
        'id': 1,
        'name': 'Leaf Rake',
        'sku': 'GDN-0011',
        'mainImage': '1_small.jpg',
        'create_date': 'March 19, 2017',
        'description': 'Leaf rake with 48-inch wooden handle.',
        'price': 19.95,
        'starRating': 3.2,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
        'category': 'Garden',
        'enabled': true,
        'tags': ['rake', 'leaf', 'yard', 'home']
      },
      {
        'id': 2,
        'name': 'Garden Cart',
        'sku': 'GDN-0023',
        'mainImage': '2_small.jpg',
        'create_date': 'March 18, 2017',
        'description': '15 gallon capacity rolling garden cart',
        'price': 32.99,
        'starRating': 4.2,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png',
        'category': 'Garden',
        'enabled': true,
        'tags': ['rake', 'leaf', 'yard', 'home']
      },
      {
        'id': 5,
        'name': 'Hammer',
        'sku': 'TBX-0048',
        'mainImage': '5_small.jpg',
        'create_date': 'May 21, 2017',
        'description': 'Curved claw steel hammer',
        'price': 8.9,
        'starRating': 4.8,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
        'category': 'Toolbox',
        'tags': ['tools', 'hammer', 'construction'],
        'enabled': true
      },
      {
        'id': 8,
        'name': 'Saw',
        'sku': 'TBX-0022',
        'mainImage': '8_small.jpg',
        'create_date': 'May 15, 2017',
        'description': '15-inch steel blade hand saw',
        'price': 11.55,
        'starRating': 3.7,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png',
        'category': 'Toolbox',
        'enabled': true,
        'tags': ['rake', 'leaf', 'yard', 'home']
      },
      {
        'id': 10,
        'name': 'Video Game Controller',
        'sku': 'GMG-0042',
        'mainImage': '6_small.jpg',
        'create_date': 'October 15, 2017',
        'description': 'Standard two-button video game controller',
        'price': 35.95,
        'starRating': 4.6,
        'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png',
        'category': 'Gaming',
        'enabled': true,
        'tags': ['rake', 'leaf', 'yard', 'home']
      }*/
    ];

    /*const users: User[] = [
      {
        'id': 5,
        'name': 'User Userovich',
        'username': 'user',
        'password': '$2a$10$4kkwTVzFnmFlUpCxNmTuE.fXliipiv56sTqBH6m.gXEYwKbRUTHTC',
        'role': 'USER',
        'token':'',
      }
      ];*/
    return {products};
  }
}
