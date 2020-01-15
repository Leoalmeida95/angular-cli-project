
import { Injectable } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { StringUtils } from '../utils/string.utils';

@Injectable()
export class SeoService {
    private titleService: Title;
    private headElement: HTMLElement;
    private metaDescription: HTMLElement;
    private metaKeywords: HTMLElement;
    private robots: HTMLElement;

    
    public constructor(private meta: Meta, titleService: Title){
        this.titleService = titleService;
        this.setTitle('');
    }

    public setSeoData(seoModel: SeoModel){
        this.setTitle(seoModel.title);
        this.setMetaRobots(seoModel.robots)
        this.setMetaDescription(seoModel.description)
        this.setMetaKeywords(seoModel.keywords)
    }

    private setTitle(newTitle: string){
        if(StringUtils.isNullOrEmpty(newTitle)) {newTitle = "Defina um Título"}
        this.titleService.setTitle(newTitle + " - Eventos.IO")
    }

    private setMetaDescription(description: string) {
        this.metaDescription = this.getOrCreateMetaElement('description');
        if (StringUtils.isNullOrEmpty(description)) { description = "Aqui você encontra um evento técnico próximo de você" }
        this.metaDescription.setAttribute('content', description);
    }

    private setMetaKeywords(keywords: string) {
        this.metaKeywords = this.getOrCreateMetaElement('keywords');
        if (StringUtils.isNullOrEmpty(keywords)) { keywords = "eventos,workshops,encontros,congressos,comunidades,tecnologia" }
        this.metaKeywords.setAttribute('content', keywords);
    }

    private setMetaRobots(robots: string) {
        this.robots = this.getOrCreateMetaElement('robots');
        if (StringUtils.isNullOrEmpty(robots)) { robots = "all" }
        this.robots.setAttribute('content', robots);
    }

    private getOrCreateMetaElement(name: string): HTMLElement {
        let el: HTMLElement;
        el = this.meta.getTag(`name="${name}"`)
        if (el === null) {
            el = this.meta.addTag({'name': name});
        }
        return el;
    }
}

export class SeoModel{
    public title: string = '';
    public description: string = '';
    public robots: string = '';
    public keywords: string = '';
}