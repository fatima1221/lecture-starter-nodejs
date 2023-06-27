import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getAllFighters() {
    return fighterRepository.getAll();
  }

  getFighterById(id) {
    return fighterRepository.getById(id);
  }

  createFighter(fighter) {
    return fighterRepository.create(fighter);
  }

  updateFighter(id, updateFighter) {
    return fighterRepository.update(id, updateFighter);
  }

  deleteFighter(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
