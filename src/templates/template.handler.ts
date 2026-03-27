import path from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';

import { InternalServerError } from '@/utils/errors/app.error';

export async function renderMailTemplate(templateId: string,params: Record<string,any>): Promise<string>{
    const templatePath=path.join(__dirname,'mailer',`${templateId}.hbs`);
    try {
        const content=await fs.readFile(templatePath,'utf-8');
        const finalTemlplate=Handlebars.compile(content);
        return finalTemlplate(params);
    } catch (error) {
        console.log(error);
        throw new InternalServerError(`Template not found:\n ${templateId}`);
    }
}