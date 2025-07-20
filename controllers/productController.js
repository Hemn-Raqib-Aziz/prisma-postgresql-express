import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient;

const productsControllers = {

    createProducts:  async (req, res) => {
        try{
            const name = req.body.name;
            const price = req.body.price;
            const categoryId = Number(req.body.categoryId);
            const { description } = req.body;
            const { data } = req.body;

            if(!name || !price || !categoryId){
                return res.status(422).json({ error: 'Missing Credentials!!!' });
            }

            if(typeof price !== "number" || price < 0){
                return res.status(422).json({ error: "Price must be a non-negative number!!!" })
            }

            if(!await prisma.category.findUnique({
                where: { id: categoryId }
            })){
                return res.status(404).json({ error: "Category id not found!!!" });
            }

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price,
                    description,
                    category: {
                        connect: { id: categoryId }
                    }
                }
            });


        
            return res.status(201).json({message: "The product created successfully!!!", data});

        }catch(error){
            return res.status(422).json({ error: error.message })
        }
    },
    getProducts: async (req, res) => {
        try{
            const products = await prisma.product.findMany({
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                omit: {
                    categoryId: true
                }
            });
            return res.status(200).json(products);
        }catch(error){
            res.status(500).json({ error: error.message })
        }
    },

    getProductById: async (req, res) => {
        try{
            const { id } = req.params;
            if(!id){
                return res.status(404).json({ error: "Missing Credentials!!!" });
            }
            const existingProduct = await prisma.product.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if(!existingProduct){
                return res.status(400).json({ message: "Product not exist" })
            }

            return res.status(200).json({ message: "Product found", existingProduct })
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }, 

   getProductsByCategoryId : async (req, res) => {
    try {
        if (!await prisma.category.findUnique({ where: { id: parseInt(req.params.categoryId) } })) {
            return res.status(404).json({ error: 'Category id not found' })
        }

        const products = await prisma.product.findMany({
            where: {
                categoryId: parseInt(req.params.categoryId)
            },

            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },

            omit: {
                categoryId: true
            },
            
            orderBy: {
                name: 'asc'
            }
        })

        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ error: error.message })  
    }
},

    updateProduct: async (req, res) => {
        try{
            const { name, price, description, categoryId } = req.body;
            const { id } = req.params;
            if (
    (name !== undefined && typeof name !== 'string') ||
    (price !== undefined && (typeof price !== 'number' || price < 0)) ||
    (categoryId !== undefined && typeof categoryId !== 'number')
) {
    return res.status(400).json({ error: "Missing or Invalid Credentials!!!" });
}


            if(!await prisma.category.findUnique({
                where: {
                    id: categoryId
                }
            })){
                return res.status(400).json({error: "Category id not found!!!"});
            }

            const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (price !== undefined) updateData.price = price;
        if (description !== undefined) updateData.description = description;
        if (categoryId !== undefined) updateData.categoryId = categoryId;


            const updatedProduct = await prisma.product.update({
                where: {
                    id: Number(id)
                },
                data: updateData,
                include: {
                    category: {
                    select: {
                        id: true,
                        name: true
                    }}
                }
            },
        )

        return res.status(200).json({updatedProduct});

        }catch(error){
            return res.status(500).json({error: error.name});
        }
    }, 


    deleteProduct: async (req, res) => {
    try {
        await prisma.product.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        return res.status(204).send()
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Product not found' })
        }

        return res.status(500).json({ error: error.message })  
    }
}
};

export default productsControllers;