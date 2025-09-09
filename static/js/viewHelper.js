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
}

// <input class="input text-center rounded-2" readonly value=${charge} />
