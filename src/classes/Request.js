class Request {
  constructor() {
    this.url = 'https://reactmarathon-api.netlify.app/';
  }

  getDamageSkills = async (characterId, attackId, enemyId) => {
    const attacks = await fetch(`${this.url}api/fight?player1id=${characterId}&attackId=${attackId}&player2id=${enemyId}`,
      { headers: { 'Access-Control-Allow-Origin': 'no-cors' } })
    return attacks.json()
  }

  getPokemons = async () => {
    const pokemons = await fetch(`${this.url}api/pokemons`);
    return pokemons.json();
  }
}

export default Request;
