import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-earn',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './earn.html',
})
export class Earn {
  protected readonly earningTypes = [
    {
      icon: 'fa-solid fa-user-plus',
      title: 'Direct referral bonus',
      desc: 'Earn a bonus every time someone signs up and shops through your referral link.',
    },
    {
      icon: 'fa-solid fa-sitemap',
      title: 'Multi-level commissions',
      desc: 'Earn a percentage of the sales made by your entire downline across several levels.',
    },
    {
      icon: 'fa-solid fa-trophy',
      title: 'Rank & milestone rewards',
      desc: 'Unlock bigger payouts and bonuses as your network reaches new milestones.',
    },
  ];

  protected readonly levels = [
    { level: 1, rate: '10%', note: 'People you refer directly' },
    { level: 2, rate: '5%', note: 'Referrals made by your referrals' },
    { level: 3, rate: '3%', note: 'Third level of your network' },
    { level: 4, rate: '2%', note: 'Fourth level of your network' },
    { level: 5, rate: '1%', note: 'Fifth level of your network' },
  ];
}
