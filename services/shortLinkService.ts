import { PrismaClient } from '@prisma/client';
import ShortUniqueId from "short-unique-id";
import * as moment from "moment";

const prisma = new PrismaClient();

const isValidUrl = (urlString: string) : boolean => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
    return !!urlPattern.test(urlString);
}

class shortLinkService {
    static async createShortLink(originalUrl: string) {
        const isUrl: boolean = isValidUrl(originalUrl);

        if (!isUrl) {
            return {
                isUrl,
                message: 'Unable to shorten that link. It is not a valid url.'
            };
        }

        const indexHTTP = originalUrl.indexOf('://');

        originalUrl = indexHTTP !== -1 ? originalUrl.substring(indexHTTP + 3) : originalUrl;

        const uid = new ShortUniqueId({
            length: 6
        });

        const uniqueLink = await prisma.links.findFirst({
            where: {
                original_url: {
                    contains: originalUrl
                },
                expireAt: {
                    gt: moment().format()
                }
            }
        });

        if (uniqueLink) {
            return {
                isUrl: false,
                message: 'Exist short link.'
            };
        }

        const shortUrl = process.env.APP_ENV === 'local' ? `${process.env.VITE_APP_URL}/${uid()}` : `https://short.l/${uid()}`;

        const expireAt = moment().add(1, 'M').format();

        const link = await prisma.links.create({
            data: {
                expireAt,
                original_url: 'http://' + originalUrl,
                short_url: shortUrl,
            }
        })

        return {
            isUrl: true,
            link
        };
    }

    static async getOriginalLink(shortUrl: string) {
        const indexHTTP = shortUrl.indexOf('://');

        shortUrl = indexHTTP !== -1 ? shortUrl.substring(indexHTTP + 3) : shortUrl;

        shortUrl = process.env.APP_ENV === 'local' ? `${process.env.VITE_APP_URL}/${shortUrl}` : `https://${shortUrl}`;

        const originalLink = await prisma.links.findFirst({
            where: {
                short_url: shortUrl,
            }
        })

        return originalLink?.original_url;
    }
}

export default shortLinkService;