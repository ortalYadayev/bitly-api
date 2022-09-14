import { PrismaClient } from '@prisma/client';
import ShortUniqueId from "short-unique-id";
import * as moment from "moment";

const prisma = new PrismaClient();

const isValidUrl = (urlString: string) : boolean => {
    let urlPattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
    return !!urlPattern.test(urlString);
}

class shortLinkService {
    static async createShortLink (originaUrl: string) {
        let isUrl: boolean = isValidUrl(originaUrl);

        if(!isUrl) {
            return { isUrl, message: 'Unable to shorten that link. It is not a valid url.'};
        }

        const uid = new ShortUniqueId({
            length: 6
        });

        const uniqueLink = await prisma.links.findMany({
            where: {
                original_url: originaUrl,
                expireAt: {
                    gt: moment().format()
                }
            }
        });

        if(uniqueLink.length > 0) {
            return { isUrl: false, message: 'Exist short link.'};
        }

        const shortUrl = "https://short.l/" + uid();
        const expireAt = moment().add(1, 'M').format();

        const link = await  prisma.links.create({
            data: {
                expireAt,
                original_url: originaUrl,
                short_url: shortUrl
            }
        })

        return { isUrl: true, message: link.short_url };
    }
}

export default shortLinkService;