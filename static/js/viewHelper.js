export class ViewHelper {
  static getFareFactorBody(factor) {
    const { fareFactor, charge, operatorTicketFareId } = factor;

    const { fareFactorId, name, fixedCharge } = fareFactor;

    return `<tr class="text-center border-bottom" data-id=${operatorTicketFareId}>
          <td class="p-3">${name}</td>
          <td class="p-3" >${fixedCharge ? "Fixed Charge" : "Person / km"}</td>
          
          <td class="p-3 charge">&#x20B9;${charge}</td>
          <td class="p-3">
            <button class="feature-btn" data-type='edit'>
              <img src="static/media/images/edit_sm_blue.svg" class="feature-icon"/>
            </button>
            <button class="feature-btn ms-2" data-type='delete'>
              <img src="static/media/images/delete_sm_red.svg" class="feature-icon"/>
            </button>
          </td>
        </tr>`;
  }

  static getFareFactorHeading() {
    return `<thead>
        <tr class="border border-bottom text-center">
          <th class="p-3">Fare Factor</th>
          <th class="p-3">Type</th>
          <th class="p-3">Charges</th>
          <th class="p-3">Options</th>
        </tr>
      </thead>
      <tbody id="fare_table_body"></tbody>
    `;
  }

  static getTableLoader() {
    return `
            <tbody class="bg-transparent mt-5">
              <tr class="bg-transparent mt-5">
                <td class="text-center mt-5 bg-transparent align-self-center d-flex justify-content-center align-items-center">
                  <div class="mt-5 justify-content-center align-self-center">
                    <div class="mt-5 loader"></div>
                  </div>
                </td>
              </tr>
            </tbody>`;
  }

  static getTableEmptyMessage(message) {
    return `<td class="text-center bg-transparent mt-5 py-5" colspan="100%"><h3>${message}</h3></td>`;
  }

  static getSelectFareTable({ fareFactor }) {
    const { fareFactorId, fixedCharge, name } = fareFactor;
    return `<li data-id=${fareFactorId} class='border-bottom pnt' data-type=${
      fixedCharge ? 1 : 0
    }>
              <a class="dropdown-item d-flex flex-column">
                <span class="fw-semibold">${name}</span>
                <small class="text-secondary">(${
                  fixedCharge ? "Fixed Charge" : "Person / km"
                })</small>
              </a>
            </li>`;
  }
}
