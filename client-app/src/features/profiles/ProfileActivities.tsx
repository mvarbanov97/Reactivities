import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Header, Image, Tab, TabProps } from 'semantic-ui-react';
import { UserActivtiy } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

export default observer(function ProfileActivities() {
    const panes = [
        { menuItem: 'Future Events', pane: { key: 'future' } },
        { menuItem: 'Past Events', pane: { key: 'past' } },
        { menuItem: 'Hosting', pane: { key: 'hosting' } },
    ];

    const { profileStore } = useStore();
    const {
        loadUserActivities,
        profile,
        loadingActivities,
        userActivities
    } = profileStore;

    useEffect(() => {
        loadUserActivities(profile!.username);
    }, [loadUserActivities, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserActivities(profile!.username, panes[data.activeIndex as number].pane.key)
    }

    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Activities'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userActivities.map((activity: UserActivtiy) => (
                            <Card
                                as={Link}
                                to={`/activities/${activity.id}`}
                                key={activity.id}
                            >
                                <Image 
                                    src={`/assets/categoryImages/${activity.category}.jpg`} 
                                    style={{ minHeight: 100, objectFit: 'cover'}}
                                />
                                <Card.Content>
                                    <Card.Header textAlign='center'>{activity.title}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(activity.date), 'do LLL')}</div>
                                        <div>{format(new Date(activity.date), 'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})