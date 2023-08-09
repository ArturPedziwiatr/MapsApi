import { MapTypes } from "@/MapTypes";
import { GeoJsonService, IGeoJsonService } from "@/services/GeoJsonService"
import { inject, injectable } from 'inversify'
import { Request, Response } from 'express-serve-static-core'
import fs from 'fs/promises'

@injectable()
export class GeoJsonController {
  constructor(
    @inject(MapTypes.Services.GeoJson) protected service: IGeoJsonService
  ) { }

  public async upload(req: Request, res: Response) {
    console.log('GeoJsonController@upload')
    try {
      const { file } = req
      if (typeof file?.path === 'string') {
        const fileData = await fs.readFile(file.path, { encoding: 'utf-8' })
        const json = JSON.parse(fileData)
        console.log(this);
        
        const isValid = this.service.validate(json)

        if (isValid) return res.sendStatus(200)

        await fs.unlink(file.path)

        return res.sendStatus(400)
      }
    } catch (error) {
      console.error(error)
      res.sendStatus(400)
    }
  }
}