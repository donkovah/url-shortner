import { Container } from "inversify";
import TYPES from "./shared/types";
import { URLService } from "./infrastructure/services/URLService";
import { URLRepository } from "./domain/repository/URLRepository";
import { IUrlRepository } from "./domain/contracts";
import { IUrlService } from "./infrastructure/contracts/IUrlService";
import { IUrlEntity, IStatEntity } from "./domain/contracts/index";
import { UrlEntity } from "./domain/models/urlEntity";
import { StatsEntity } from "./domain/models/statsEntity";

const iocContainer = new Container();

iocContainer.bind<IUrlService>(TYPES.URLService).to(URLService);

iocContainer.bind<IUrlRepository>(TYPES.IUrlRepository).to(URLRepository);

iocContainer.bind<IUrlEntity>(TYPES.IUrlEntity).to(UrlEntity);

iocContainer.bind<IStatEntity>(TYPES.IStatEntity).to(StatsEntity);

export default iocContainer;
