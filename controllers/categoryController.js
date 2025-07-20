import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const categoryControllers = {
    createCategory: async (req, res) => {
        
        try{
            const name = req.body.name;
        if(!name){
            return res.status(422).json({error: `Name is Required`});
        }

        if(await prisma.category.findUnique({where: { name }})){
           return res.status(409).json({error: `${name} category already exist`});
        }
        
        const newCategory = await prisma.category.create({
            data: {
                name
            }
        });

       return res.status(201).json({message: `the new category created successfully`, newCategory});

    }catch(error){
        return res.status(500).json({error: error.message});
    }
},

getCategories: async (req, res) => {

    try{

        const categories = await prisma.category.findMany();

        const response = categories.length === 0 ? 
             { message: "There is no any Categories inside the database"} : 
            { message: "the categories fetched successfully", categories }; 
        
        return  res.status(200).json(response);

    }catch(error){
        return res.status(500).json({error: error.name})
    }
},

updateCategories: async (req, res) => {
    try{
        const id = Number(req.params.id);
        const name = req.body.name;
        if(!name || !id){
            return res.status(404).json({ error: `Missing credentials` })
        }
        
        const existingCategory = await prisma.category.findUnique({
            where: { id }
        });

        if(!existingCategory){
            return res.status(404).json({ error: `Category not found!!!` })
        }

        if(await prisma.category.findUnique({ where: { name } })){
            return res.status(409).json({ error: `${name} category already exist` })
        }

        const updatedCategory = await prisma.category.update({
            data: {
                name
            }, 
            where: {
                id
            }
        });

        return res.status(200).json({ message: `The category updated successfully`, updatedCategory});

    }catch(error){
       return res.status(500).json({error: error.name});
    }
},

deletedCategory: async (req, res) => {
    try{
        const id = Number(req.params.id);
        if(!id){
            return res.status(400).json({ error: `Missing Credentials!!!` });
        }

        const existingCategory = await prisma.category.findUnique({
            where: {
                id
            }
        });

         const productCount = await prisma.product.count({
            where: {
                categoryId: parseInt(id)
            }
        })

        if (productCount) {
            return res.status(409).json({ error: `Category id is being used in ${productCount} product(s)` })
        }

        if(!existingCategory){
            return res.status(404).json({ error: "Category not found" });
        }


        const deletedCategory = await prisma.category.delete({
            where: {
                id
            }
        });

        return res.status(204).json({ message: "Category deleted successfully" });

    }catch(error){
        return res.status(500).json({ error: error.name });
    }
}


}


export default categoryControllers;