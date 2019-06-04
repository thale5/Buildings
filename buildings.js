const names =
[
	// # Network connections
	'Road Connection','Road Connection Small','Train Connection','Airplane Connection','Ship Connection',

	// # Pillars
	'MediumBridgePillar','HighwayBridgePillar','HighwayRampPillar','HighwayBridgeSuspensionPillar','LargeRoadBridgeSuspensionPillar','RoadSmallBridgePillar','GravelBridgePillar',
	'RailwayBridgePillar','RailwayElevatedPillar','RailOnewayBridgePillar','RailOnewayElevatedPillar','Pedestrian Elevated Pillar','LargeRoadBikeBridgeSuspensionPillar',
	'Two Lane Highway Bridge Pillar','Two Lane Highway Suspension Pillar','Four Lane Highway Bridge Pillar','Four Lane Highway Suspension Pillar','Wooden Footbridge Pillar 6',
	'Wooden Footbridge Pillar 12','Wooden Footbridge Pillar 18','Wooden Footbridge Pillar 24','Cable Car Pylon 12','Cable Car Pylon 24','Cable Car Pylon 36','Cable Car Pylon 48',
	'Cable Car Pylon 60','Monorail Pylon','Monorail Pylon 2','Monorail Pylon 3',

	// # Road infrastructure
	'Empty Intersection','RoundaboutL','RoundaboutS',

	// # Other infrastructure
	'Integrated Metro Station','Metro Entrance','Water Intake','Water Outlet','Fresh Water Outlet','Eco Water Outlet'
]

const exs = Object.create(null)
let x,y

const GetAssetName = myCode => myCode.html().split('\n')[0]

const OutputConfig = () => {
	const skips = $('#skips').empty()
    let some = false

    $('.skipped code').each(function()
    {
        const name = GetAssetName($(this))
        const item = $('<p>'+name+'</p>')

        if (name in exs)
        {
            item.addClass('ex')
            some = true
        }

        skips.append(item)
    })

    let head = 'Buildings:<br><br># You can remove items by clicking with the mouse.<br><br>'

    if (some)
        head += '# The items marked with yellow are not ordinary buildings.<br># They should probably not be skipped.<br># However, you can skip them if you absolutely want.<br><br>'

    skips.prepend(head)
    skips.append('<br>')
    const lines = skips.children('p')
	lines.mousedown(e => [x,y] = [e.pageX,e.pageY])

    lines.mouseup(function(e)
    {
        if (Math.abs(x - e.pageX) < 5 && Math.abs(y - e.pageY) < 5)
        {
            const name = $(this).text()

            $('code').filter(function()
            {
                return GetAssetName($(this)) == name
            }).closest('.my').removeClass('skipped')

            OutputConfig()
        }
	})
}

const Ini = () =>
{
	const nodes=document.querySelectorAll('img')

	for (var i=0;i<nodes.length;i++)
	{
		let img=nodes[i]
		img.setAttribute('src',img.getAttribute('data-s'))
	}

    for (let v of names)
        exs[v]=null

	// heading toggle
	$('h2').click(function()
    {
		const mys = $(this).nextUntil('h2, h3')
        mys.toggleClass('skipped', !mys.first().hasClass('skipped'))
		OutputConfig()
	})

    const codes = $('code')
	codes.mousedown(e => [x,y] = [e.pageX,e.pageY])

	// individual asset toggle
    codes.mouseup(function(e)
    {
        if (Math.abs(x - e.pageX) < 7 && Math.abs(y - e.pageY) < 7)
        {
            $(this).closest('.my').toggleClass('skipped')
		    OutputConfig()
        }
	})
}
