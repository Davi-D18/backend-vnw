export class HealthController {
  static async check(req, res) {
    return res.status(200).json({
      status: 'ok',
      message: 'API funcionando.',
      timestamp: new Date().toISOString(),
    });
  }
}
