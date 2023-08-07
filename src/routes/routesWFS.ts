import { IWFSController } from '@/interface/WFS/IWFSController'
import { MapTypes } from '@MapTypes'
import express from 'express'
import { Container } from 'inversify'

export default function routerWFS(container: Container) {
    const route = express.Router()
    const controller = container.get<IWFSController>(MapTypes.Http.Controller.WFS)
    route.get(
      '/getWFSFeatures',
      (req, res) => controller.getWFSFeatures(req, res),
    )

    return route
  }
