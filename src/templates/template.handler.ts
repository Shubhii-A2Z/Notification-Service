import path from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';

import { InternalServerError } from '@/utils/errors/app.error';


/**
    @param templateId   Name of the template file (without .hbs)
    @param params       Key-value data to populate the template
    @returns            Rendered HTML string
**/


// loading the Handlebars (.hbs) email template, filling it with data, and return the final HTML string
export async function renderMailTemplate(templateId: string,params: Record<string,any>): Promise<string>{
    
    //Builds path like: build/.../mailer/welcome.hbs
    const templatePath=path.join(__dirname,'mailer',`${templateId}.hbs`);

    try {
        // Reading the .hbs file content as string
        const content=await fs.readFile(templatePath,'utf-8');

        // Converting template into a reusable function
        const finalTemlplate=Handlebars.compile(content);

        // Injecting params into template and returns final result
        return finalTemlplate(params);

    } catch (error) {
        console.log(error);
        throw new InternalServerError(`Template not found:\n ${templateId}`);
    }
}