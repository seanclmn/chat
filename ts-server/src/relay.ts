import { Field, ID, InterfaceType, ObjectType } from "@nestjs/graphql";

@InterfaceType()
export abstract class Node {
  @Field(() => ID)
  id: string
}

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field()
  startCursor: string;

  @Field()
  endCursor: string;
}

// @InterfaceType()
// export class Edge<Type> {
//   @Field(() => String)
//   cursor: string;

//   @Field(() => Type)
//   node: Type;
// }

// @InterfaceType()
// export class Connection<T> {
//   @Field(() => [Edge], { nullable: 'itemsAndList' })
//   edges: Edge<T>[];

//   @Field(() => PageInfo)
//   pageInfo: PageInfo;
// }