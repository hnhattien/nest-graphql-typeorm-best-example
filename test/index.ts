import {
  Expose,
  classToPlain,
  plainToClass,
  plainToClassFromExist,
  serialize,
} from 'class-transformer';

const data = [
  {
    id: 1,
    firstName: 'Johny',
    lastName: 'Cage',
    age: 27,
    hihi: 1,
  },
  {
    id: 2,
    firstName: 'Ismoil',
    lastName: 'Somoni',
    age: 50,
  },
  {
    id: 3,
    firstName: 'Luke',
    lastName: 'Dacascos',
    age: 12,
  },
];

class User {
  @Expose()
  id: number;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  age: number;

  getName() {
    return this.firstName + ' ' + this.lastName;
  }

  isAdult() {
    return this.age > 36 && this.age < 60;
  }
}

const defaultUser = new User();
defaultUser.firstName = 'user';

const user: User = plainToClass(User, data[0]);

console.log(user);
