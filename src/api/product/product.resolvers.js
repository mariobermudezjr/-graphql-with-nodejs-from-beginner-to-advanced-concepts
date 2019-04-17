export default {
  Query: {
    async getProduct(_, { _id }, ctx) {
      return await ctx.models.product.findById(_id);
    },
    async allProducts(_, args, ctx) {
      return await ctx.models.product.find();
    },
    hello(parent, args, ctx, info) {
      console.log(ctx.user);
      console.log(info);

      return args.msg;
    }
  },
  Mutation: {
    async createProduct(_, { input }, ctx) {
      return await ctx.models.product.create(input);
    },
    async updateProduct(_, { _id, input }, ctx) {
      return await ctx.models.product.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteProduct(_, { _id }, ctx) {
      return await ctx.models.product.findByIdAndRemove(_id);
    }
  }
};
