import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchUsersInput {
  @Field()
  username: string;
}
